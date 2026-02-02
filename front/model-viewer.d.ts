import 'react';

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                src?: string;
                'ios-src'?: string;
                poster?: string;
                alt?: string;
                'shadow-intensity'?: string | number;
                'camera-controls'?: boolean;
                'auto-rotate'?: boolean;
                ar?: boolean;
                'ar-modes'?: string;
                'camera-orbit'?: string;
                exposure?: string | number;
                'environment-image'?: string;
                style?: React.CSSProperties;
            };
        }
    }
}
