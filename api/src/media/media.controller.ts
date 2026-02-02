import { Controller, Post, Get, Query, UseInterceptors, UploadedFile, BadRequestException, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import * as path from 'path';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }

        const url = await this.mediaService.saveFile(file);

        return {
            id: path.basename(url),
            url,
            name: file.originalname,
            type: file.mimetype.includes('image') ? 'IMAGE' : 'GLB',
            size: file.size,
            createdAt: new Date().toISOString(),
        };
    }

    @Get()
    async getFiles(
        @Query('type') type?: 'IMAGE' | 'GLB',
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.mediaService.getAllFiles(
            type,
            page ? parseInt(page) : 1,
            limit ? parseInt(limit) : 20
        );
    }

    @Post('delete-multiple')
    async deleteMultiple(@Query('ids') ids: string) {
        const idArray = ids.split(',');
        await this.mediaService.deleteMultipleFiles(idArray);
        return { success: true };
    }

    @Delete(':id')
    async deleteFile(@Param('id') id: string) {
        await this.mediaService.deleteFile(id);
        return { success: true };
    }
}
