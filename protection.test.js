import { RuleTester } from "eslint";
import protectedRule from "./protection.js";

const ruleTester = new RuleTester({
    languageOptions: { ecmaVersion: 2024 }
});

ruleTester.run(
    'protection',
    protectedRule,
    {
        valid: [
            { code: '//Nothing protected, all valid\nconst nothingProtected = true\n' },
            { code: '//@protection c2TvfuHX4lstMYoV+ij1Kg==\nconst isProtected = true;\nconst isNotProtected = true;\n' },
            { code: '//@protection c2TvfuHX4lstMYoV+ij1Kg==\nconst isProtected = true;\nconst isNotProtected = false;\n' },
            { code: '//@protection 2 JaggwuoN2bzh5BSuFVvAYw==\nconst firstProtected = true;\nconst secondProtected = true;\nconst thirdProtected = false\n' },
            { code: '//@protection * 7CxqG6SeXSUtHL5O7dcKTQ==\nconst firstProtected = true;\nconst secondProtected = true;\nconst thirdProtected = true\n' },
        ],
        invalid: [
            { code: '//@protection\nconst hasHash = false;\n', errors: 1, output: '//@protection WJVx3kRTd+Z/Duy+48TaVw==\nconst hasHash = false;\n' },
            { code: '//@protection abcd1234\nconst wrongHash = true;\n', errors: 1, output: '//@protection oXiy+rgFVZNHbiqxyy1jNg==\nconst wrongHash = true;\n' },
            { code: '//@protection 2 JaggwuoN2bzh5BSuFVvAYw==\nconst firstProtected = true;\nconst secondProtected = false;\nconst thirdProtected = false\n', errors: 1, output: '//@protection 2 KAIz8W01NtSfc7wszltH5A==\nconst firstProtected = true;\nconst secondProtected = false;\nconst thirdProtected = false\n' },
        ]
    }
)
