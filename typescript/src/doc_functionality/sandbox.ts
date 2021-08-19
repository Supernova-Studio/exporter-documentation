// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Imports

import { btoa } from "abab"

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Code sandbox

export function isSandboxDefinition(block: DocumentationPageBlockCode): boolean {
  let string = block.text.spans.map((s) => s.text).join("")
  return string.startsWith("Mode:SANDBOX")
}

export function encodeSandboxData(block: DocumentationPageBlockCode): string {
  // Encode object
  let sandboxData = parseSandboxBlockData(block)
  return btoa(JSON.stringify(sandboxData)) as string
}

export function getFrontendSandboxData(block: DocumentationPageBlockCode): {
  code: string
  showCodeByDefault: boolean
  editable: boolean
  height: number | string
} {
  let sandboxData = parseSandboxBlockData(block)
  let visualPayload = sandboxData.visual as any

  // Basic HTML encoding
  let encodedHTMLString = sandboxData.code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

  return {
    code: encodedHTMLString,
    showCodeByDefault: visualPayload?.showCodeByDefault,
    height: visualPayload?.forcedHeight ? `${visualPayload?.forcedHeight}px` : `auto`,
    editable: visualPayload?.editable ?? false,
  }
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Support

function parseSandboxBlockData(block: DocumentationPageBlockCode) {
  let definitionParts = block.text.spans
    .map((s) => s.text)
    .join("")
    .split("---")

  // Parse configuration
  let modeString = definitionParts[0]
  let configurations = {}
  for (let configurationLine of modeString.split("\n")) {
    let parts = configurationLine.split(":")
    if (parts.length === 2) {
      let configKey = cleanupString(parts[0])
      let configValue = cleanupString(parts[1])
      configurations[configKey] = configValue
    }
    {
      // Ignore because configuration always has to be setup
    }
  }

  // Parse dependencies
  let dependencyString = definitionParts[1]
  let dependencies = {}
  for (let dependencyLine of dependencyString.split("\n")) {
    let parts = dependencyLine.split(":")
    if (parts.length === 2) {
      // Cleanup and remove quotes, if any
      let depName = cleanupString(parts[0])
      if (depName.length > 0) {
        let depVersion = cleanupString(parts[1])
        dependencies[depName] = depVersion
      } else {
        // Ignore as it is empty and therefore corrupted
      }
    } else if (parts.length === 1) {
      let depName = cleanupString(dependencyLine)
      if (depName.length > 0) {
        let depVersion = "latest"
        dependencies[depName] = depVersion
      } else {
        // Ignore as it is empty and therefore corrupted
      }
    } else {
      // Ignore as it is unknown or corrupted
    }
  }

  // Parse script
  let codeString = definitionParts[2]

  // Parse visual configuration object
  const visualConfiguration = {}
  if (configurations["Horizontal"]) {
    visualConfiguration["horizontalAlignment"] = configurations["Horizontal"]
  }
  if (configurations["Vertical"]) {
    visualConfiguration["verticalAlignment"] = configurations["Vertical"]
  }
  if (configurations["Background"]) {
    visualConfiguration["backgroundHex"] = configurations["Background"]
  }
  if (configurations["Sandbox"]) {
    visualConfiguration["showSandbox"] = true // whatever is configured will result to true
  }
  if (configurations["Height"]) {
    visualConfiguration["forcedHeight"] = configurations["Height"] // whatever is configured will result to true
  }
  if (configurations["Code"]) {
    visualConfiguration["showCodeByDefault"] = true
  }
  if (configurations["Editable"]) {
    visualConfiguration["editable"] = true
  }

  // Create object and encode it
  const sandboxPayload = {
    type: "react",
    code: codeString,
    dependencies: dependencies,
    visual: visualConfiguration,
  }

  return sandboxPayload
}

function cleanupString(string: string): string {
  return string.trim().replace(/^"(.*)"$/, "$1")
}
