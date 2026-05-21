interface EditorConfig {
  id: string;
  name: string;
  icon: string;
  description: string;
  usageGuide: string[];
}

export const EDITORS: EditorConfig[] = [
  {
    id: 'claude',
    name: 'Claude',
    icon: '🤖',
    description: 'Anthropic Claude AI - Browser-based conversation interface',
    usageGuide: [
      '1. Open claude.ai in your web browser',
      '2. Click the plus icon to start a new conversation',
      '3. Copy the entire content from your downloaded .md file',
      '4. Paste the content directly into the chat input box',
      '5. Claude reads the instructions and adapts automatically',
      '6. Ask Claude questions or request specific changes to the instructions',
      '7. Try customizing the prompt by asking: "Apply this to my specific project context"',
    ],
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    icon: '⚡',
    description: 'GitHub Copilot - AI code assistant integrated in your IDE',
    usageGuide: [
      '1. Open your code editor (VS Code, JetBrains, or other supported IDE)',
      '2. Activate the Copilot Chat panel (Ctrl+Shift+I on Windows, Cmd+Shift+I on Mac)',
      '3. Paste the downloaded .md file content into the chat input',
      '4. Press Enter to send the prompt to Copilot',
      '5. Copilot generates code suggestions directly in your editor context',
      '6. Click "Accept" to insert suggested code into your file',
      '7. Customize by telling Copilot your tech stack: "I\'m using React and TypeScript"',
    ],
  },
  {
    id: 'cursor',
    name: 'Cursor',
    icon: '✨',
    description: 'Cursor IDE - VS Code fork with AI superpowers',
    usageGuide: [
      '1. Open Cursor and create or open your project folder',
      '2. Press Ctrl+K (Windows) or Cmd+K (Mac) to open the Command Palette',
      '3. Type "chat" and select "Cursor Chat" to open the chat panel',
      '4. Paste the entire .md file content into the chat input box',
      '5. Hit Enter and Cursor analyzes your prompt in your project context',
      '6. Review the generated code and click the checkmark to apply changes',
      '7. Adapt the prompt by selecting your relevant project files first for better context',
    ],
  },
  {
    id: 'cody',
    name: 'Cody',
    icon: '🔍',
    description: 'Sourcegraph Cody - Context-aware AI assistant with code search',
    usageGuide: [
      '1. Install the Cody extension in VS Code, JetBrains, or Neovim',
      '2. Click the Cody icon in the sidebar to open the chat panel',
      '3. Copy your downloaded .md file content and paste it into Cody Chat',
      '4. Press Enter to submit your prompt',
      '5. Cody searches your codebase to provide context-aware responses',
      '6. Click on suggested code snippets to navigate or apply them',
      '7. Customize by mentioning specific files: "@filename.ts use this pattern"',
    ],
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    icon: '🌊',
    description: 'Windsurf by Codeium - AI-first IDE with deep code integration',
    usageGuide: [
      '1. Open Windsurf IDE with your project folder',
      '2. Click the Windsurf AI icon in the left sidebar to open the chat',
      '3. Paste the content from your downloaded .md file into the chat box',
      '4. Press Enter to execute the prompt in your project context',
      '5. Windsurf automatically applies suggestions to the correct files',
      '6. Review changes in the file tabs and approve them with the checkmark',
      '7. Tailor the prompt by typing: "In my frontend stack (React/Vue/Angular)"',
    ],
  },
  {
    id: 'other',
    name: 'Other',
    icon: '🛠️',
    description: 'Any AI tool or custom setup',
    usageGuide: [
      '1. Open your preferred AI assistant (ChatGPT, Gemini, Perplexity, etc.)',
      '2. Start a new conversation or chat session',
      '3. Copy and paste the entire content from the downloaded .md file',
      '4. Submit the prompt and wait for the AI to process it',
      '5. Read the instructions and generate outputs based on the guidelines',
      '6. Copy the generated code or responses into your project manually',
      '7. Customize by adding your specific constraints: "My project uses X technology"',
    ],
  },
];

export function getEditorConfig(id: string): EditorConfig | undefined {
  return EDITORS.find((editor) => editor.id === id);
}
