import { nanoid } from "nanoid";
import { TemplateBlock } from "@/types/template";

function assertNever(x: never): never {
    throw new Error("Unhandled block type: " + x);
}

export function createBlock(
    type: TemplateBlock["type"]
): TemplateBlock {
    switch (type) {
        case "header":
            return {
                id: nanoid(),
                type: "header",
                text: "Restaurant Name",
            };

        case "sections":
            return {
                id: nanoid(),
                type: "sections",
                showTitle: true,
            };


        case "divider":
            return {
                id: nanoid(),
                type: "divider",
            };

        case "spacer":
            return {
                id: nanoid(),
                type: "spacer",
                height: 24,
            };

        default:
            return assertNever(type);
    }
}
