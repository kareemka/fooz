"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useCart } from "@/lib/store";
import { motion } from "framer-motion";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { CURRENCY } from "@/lib/constants";

const CREATE_ORDER = gql`
    mutation CreateOrder($input: CreateOrderInput!) {
        createOrder(createOrderInput: $input) {
            id
            orderNumber
        }
    }
`;

const CheckoutPage = () => {
    const { items, getTotal, clearCart } = useCart();
    const [isOrdered, setIsOrdered] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: 'بغداد'
    });

    const [createOrder, { loading }] = useMutation(CREATE_ORDER, {
        onCompleted: () => {
            setIsOrdered(true);
            clearCart();
        },
        onError: (error) => {
            alert(`حدث خطأ أثناء إتمام الطلب: ${error.message}`);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const input = {
            customerName: `${formData.firstName} ${formData.lastName}`,
            customerPhone: formData.phone,
            shippingAddress: `${formData.address}, ${formData.city}`,
            totalAmount: getTotal(),
            items: items.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price,
                colorName: item.selectedColor?.name || null,
                sizeName: item.selectedSize?.name || null,
                accessories: item.selectedAccessories?.map(acc => ({
                    name: acc.name,
                    price: acc.price
                })) || []
            }))
        };

        createOrder({ variables: { input } });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (isOrdered) {
        return (
            <main className="min-h-screen">
                <section className="pt-40 pb-24 text-center">
                    <Container>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-xl mx-auto glass p-12 rounded-3xl border border-primary/30"
                        >
                            <span className="material-symbols-outlined text-[80px] text-primary block mb-6">check_circle</span>
                            <h1 className="text-4xl font-black text-white mb-4">تم استلام طلبك!</h1>
                            <p className="text-gray-400 text-lg mb-8">
                                شكرًا لتسوقك مع فووز. سيتواصل معك فريقنا قريباً لتأكيد الشحن.
                            </p>
                            <Button size="lg" onClick={() => window.location.href = "/"}>العودة للرئيسية</Button>
                        </motion.div>
                    </Container>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen">

            <section className="pt-48 pb-24 bg-gaming-grid" dir="rtl">
                <Container>
                    <h1 className="text-4xl font-black text-white mb-12 text-right">إتمام الطلب</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Form */}
                        <div className="lg:col-span-2 order-2 lg:order-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass p-8 rounded-3xl border border-white/5"
                            >
                                <form onSubmit={handleSubmit} className="space-y-8 text-right">
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-bold text-white mb-6">معلومات الشحن</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-gray-400 mb-2 text-sm">الاسم الأول</label>
                                                <input name="firstName" value={formData.firstName} onChange={handleInputChange} required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary text-right" />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 mb-2 text-sm">الاسم الأخير</label>
                                                <input name="lastName" value={formData.lastName} onChange={handleInputChange} required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary text-right" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 mb-2 text-sm">رقم الهاتف</label>
                                            <input name="phone" value={formData.phone} onChange={handleInputChange} required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary font-mono text-right" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 mb-2 text-sm">العنوان بالتفصيل</label>
                                            <textarea name="address" value={formData.address} onChange={handleInputChange} required rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary resize-none text-right"></textarea>
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 mb-2 text-sm">المدينة</label>
                                            <select name="city" value={formData.city} onChange={handleInputChange} required className="w-full bg-[#151526] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary text-right">
                                                <option value="بغداد">بغداد</option>
                                                <option value="البصرة">البصرة</option>
                                                <option value="نينوى">نينوى</option>
                                                <option value="الأنبار">الأنبار</option>
                                                <option value="كربلاء">كربلاء</option>
                                                <option value="النجف">النجف</option>
                                                <option value="بابل">بابل</option>
                                                <option value="كركوك">كركوك</option>
                                                <option value="ديالى">ديالى</option>
                                                <option value="صلاح الدين">صلاح الدين</option>
                                                <option value="واسط">واسط</option>
                                                <option value="القادسية">القادسية</option>
                                                <option value="ذي قار">ذي قار</option>
                                                <option value="المثنى">المثنى</option>
                                                <option value="ميسان">ميسان</option>
                                                <option value="أربيل">أربيل</option>
                                                <option value="السليمانية">السليمانية</option>
                                                <option value="دهوك">دهوك</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-6 pt-8 border-t border-white/5">
                                        <h3 className="text-2xl font-bold text-white mb-6">طريقة الدفع</h3>
                                        <div className="p-4 rounded-xl border border-primary bg-primary/5 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-primary/20 rounded-lg text-primary"><span className="material-symbols-outlined">local_shipping</span></div>
                                                <div className="text-right">
                                                    <p className="text-white font-bold">الدفع عند الاستلام</p>
                                                    <p className="text-gray-500 text-xs">ادفع نقداً عند استلام طلبك</p>
                                                </div>
                                            </div>
                                            <div className="w-6 h-6 rounded-full border-4 border-primary bg-white"></div>
                                        </div>
                                    </div>

                                    <Button disabled={loading || items.length === 0} type="submit" className="w-full text-xl py-4 mt-8">
                                        {loading ? "جاري تنفيذ الطلب..." : "تأكيد الطلب"}
                                    </Button>
                                </form>
                            </motion.div>
                        </div>

                        {/* Summary */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass p-8 rounded-3xl border border-white/5 sticky top-32"
                            >
                                <h3 className="text-2xl font-bold text-white mb-6 text-right">ملخص الطلب</h3>
                                <div className="space-y-4 mb-8">
                                    {items.map((item: any) => (
                                        <div key={item.cartItemId} className="flex justify-between items-start text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="text-white font-bold">{(item.price * item.quantity).toLocaleString()} {CURRENCY.SYMBOL}</span>
                                                {item.originalPrice > item.price && (
                                                    <span className="text-gray-500 line-through text-[10px]">
                                                        {(item.originalPrice * item.quantity).toLocaleString()} {CURRENCY.SYMBOL}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex-1 mr-4">
                                                <p className="text-white text-sm line-clamp-1">{item.name}</p>
                                                <p className="text-gray-500 text-[10px]">{item.quantity} × {item.price.toLocaleString()} {CURRENCY.SYMBOL}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 pt-6 border-t border-white/5">
                                    <div className="flex justify-between text-gray-400">
                                        <span className="text-white font-bold">{getTotal().toLocaleString()} {CURRENCY.SYMBOL}</span>
                                        <span>المجموع الفرعي</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span className="text-green-500 font-bold">مجاني</span>
                                        <span>الشحن</span>
                                    </div>
                                    <div className="flex justify-between text-2xl font-black text-white pt-4">
                                        <span>{getTotal().toLocaleString()} {CURRENCY.SYMBOL}</span>
                                        <span>الإجمالي</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </Container>
            </section>

        </main>
    );
};

export default CheckoutPage;
