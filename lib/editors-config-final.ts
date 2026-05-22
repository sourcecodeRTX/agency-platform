interface EditorConfig {
  id: string;
  name: string;
  icon: string;
  description: string;
  usageGuide: string[];
}

export const EDITORS: EditorConfig[] = [
  {
    id: 'vscode',
    name: 'VS Code',
    icon: '📝',
    description: 'Visual Studio Code with GitHub Copilot',
    usageGuide: [
      '1. Open VS Code Settings (Ctrl+, or Cmd+,)',
      '2. Search for "Copilot: Instructions"',
      '3. Paste the downloaded .md file content',
      '4. Save and restart VS Code',
      '5. Use with Copilot Chat (Ctrl+Shift+I)',
    ],
  },
  {
    id: 'cursor',
    name: 'Cursor',
    icon: '✨',
    description: 'Cursor IDE with built-in AI',
    usageGuide: [
      '1. Open Cursor Settings (Ctrl+, or Cmd+,)',
      '2. Search for "Custom Instructions"',
      '3. Paste the downloaded .md file content',
      '4. Save settings',
      '5. Start using with Cursor Chat (Ctrl+K)',
    ],
  },
  {
    id: 'kiro',
    name: 'Kiro',
    icon: '🚀',
    description: 'Kiro AI Code Editor',
    usageGuide: [
      '1. Open Kiro Editor and go to Preferences',
      '2. Find "Agent Instructions" or "Custom Prompts"',
      '3. Paste the downloaded .md file content',
      '4. Click Save and Apply',
      '5. Your agent is ready to use',
    ],
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    icon: '🌌',
    description: 'Antigravity AI Development Platform',
    usageGuide: [
      '1. Log into your Antigravity workspace',
      '2. Go to Settings → Add New Agent',
      '3. Upload or paste the downloaded .md file',
      '4. Configure agent settings if needed',
      '5. Save and activate the agent',
    ],
  },
  {
    id: 'other',
    name: 'Other Editors',
    icon: '🛠️',
    description: 'ChatGPT, Gemini, or other AI platforms',
    usageGuide: [
      '1. Open your AI platform (ChatGPT, Gemini, etc.)',
      '2. Start a new conversation',
      '3. Copy the downloaded .md file content',
      '4. Paste it at the beginning of your message',
      '5. Send and use your agent',
    ],
  },
];

export function getEditorConfig(id: string): EditorConfig | undefined {
  return EDITORS.find((editor) => editor.id === id);
}
