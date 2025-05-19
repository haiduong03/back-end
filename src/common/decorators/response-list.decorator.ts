import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { ResponseList } from "../type/common";

// export function PaginatedResponse(model: Type<unknown>, description = '') {
//     return applyDecorators(
//         ApiExtraModels(ResponseList, model),
//         ApiOkResponse({
//             description,
//             schema: {
//                 allOf: [
//                     { $ref: getSchemaPath(ResponseList) },
//                     {
//                         properties: {
//                             items: {
//                                 type: 'array',
//                                 items: { $ref: getSchemaPath(model) },
//                             },
//                             totalCount: {
//                                 type: 'number',
//                             },
//                         },
//                     },
//                 ],
//             },
//         }),
//     );
//   }
export function PaginatedResponse(model: Type<unknown>, description = '') {
    return applyDecorators(
        ApiExtraModels(model),
        ApiOkResponse({
            description,
            schema: {
                type: 'object',
                properties: {
                    items: {
                        type: 'array',
                        items: { $ref: getSchemaPath(model) },
                    },
                    totalCount: {
                        type: 'number',
                        example: 0,
                    },
                },
            },
        }),
    );
  }