"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actor = void 0;
const common_1 = require("@nestjs/common");
const Actor = (...args) => (0, common_1.SetMetadata)('actor', args);
exports.Actor = Actor;
//# sourceMappingURL=actor.decorator.js.map