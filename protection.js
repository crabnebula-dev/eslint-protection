import { createHash } from "node:crypto";

export default {
    meta: {
        type: "problem",
        docs: {
            category: "Malevolent code changes",
            description: "Protects parts of the code using a hash",            
            url: "https://github.com/crabnebula-dev/eslint-protected"
        },
        fixable: "code",
        schema: []
    },
    create(context) {
        const code = context.getSourceCode();
        const trimmedLines = code.getLines().map(line => line.trim());
        return {
            Program() {
                for (const comment of code.getAllComments()) {
                    const [_, lines, savedHash] = comment.value.match(/@protection(?: ?(\d+|\*|)) *([^\n]*)/) || [null, null, null];
                    if (savedHash !== null) {
                        const protectedCode = lines === '*'
                            ? trimmedLines
                                .filter((_, i) => i + 1 !== comment.loc.start.line)
                                .join("\n")
                            : trimmedLines
                                .slice(comment.loc.start.line, comment.loc.start.line + (parseInt(lines) || 1))
                                .join('\n');
                        const hash = createHash('md5');
                        hash.update(protectedCode);
                        const contentHash = hash.digest('base64');
                        if (contentHash !== savedHash) {
                            context.report({
                                node: comment,
                                message: `Invalid protection hash ${savedHash || '[empty hash]'}, should be ${contentHash}`,
                                data: {
                                    savedHash,
                                    contentHash,
                                },
                                fix(fixer) {
                                    return fixer.replaceText(comment, ["//@protection", lines, contentHash].filter(Boolean).join(" "))
                                },
                            });
                        }
                    }
                }
            }
        }
    }
}