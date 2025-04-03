"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const uuid_1 = require("uuid");
let FilesService = class FilesService {
    async uploadFile(file, directory = 'uploads') {
        const uploadDir = `./public/${directory}`;
        if (!(0, fs_1.existsSync)(uploadDir)) {
            (0, fs_1.mkdirSync)(uploadDir, { recursive: true });
        }
        const fileName = `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
        const filePath = `${uploadDir}/${fileName}`;
        const writeFile = require('fs').promises.writeFile;
        await writeFile(filePath, file.buffer);
        return `/${directory}/${fileName}`;
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)()
], FilesService);
//# sourceMappingURL=files.service.js.map