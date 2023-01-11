"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetRatingDataTransferObject = void 0;
const mongoose_1 = require("mongoose");
const class_validator_mongo_object_id_1 = require("class-validator-mongo-object-id");
const class_validator_1 = require("class-validator");
class SetRatingDataTransferObject {
}
__decorate([
    (0, class_validator_mongo_object_id_1.IsObjectId)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], SetRatingDataTransferObject.prototype, "movieId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SetRatingDataTransferObject.prototype, "value", void 0);
exports.SetRatingDataTransferObject = SetRatingDataTransferObject;
//# sourceMappingURL=set-rating.dto.js.map