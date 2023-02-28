// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Imports

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - String utils

/** Escape special characters in the given string of text. Encoding part taken from https://github.com/component/escape-html */
export function highlightSafeString(block: DocumentationPageBlockCode) {
  // Retrieve raw text, ignore all attributes for now
  let string = block.text.spans.map((s) => s.text).join("")

  // Make sure it is properly safe for HTML rendering
  return escapeHtml(string)
}

export function escapeHtml(string: string) {
  if (!string) {
    return
  }
  
  var matchHtmlRegExp = /["'&<>]/
  var str = "" + string
  var match = matchHtmlRegExp.exec(str)

  if (!match) {
    return str
  }

  var escape
  var html = ""
  var index = 0
  var lastIndex = 0

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = "&quot;"
        break
      case 38: // &
        escape = "&amp;"
        break
      case 39: // '
        escape = "&#39;"
        break
      case 60: // <
        escape = "&lt;"
        break
      case 62: // >
        escape = "&gt;"
        break
      default:
        continue
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index)
    }

    lastIndex = index + 1
    html += escape
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html
}

export function addSlashes( str ) {
  return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

export function withHTMLNewlines(string: string): string {
  if (string) {
    return string.split("\n").join("<br />")
  }
  return ""
}

export function getUrlExtension(url: string): string | undefined {
  if (url) {
    return url.split('.').pop()
  }
  return undefined
}

export function changelogToEntries(changeLog: string): Array<string> {

  if (!changeLog) {
    return []
  }

  let lines = changeLog.split("\n").map(c => c.trim())
  let modifiedLines = new Array<string>()
  for (let line of lines) {
    if (line.startsWith("-")) {
      modifiedLines.push(line.substring(1))
    } else {
      modifiedLines.push(line)
    }
  }

  modifiedLines = modifiedLines.map(l => l.trim()).filter(l => l.trim().length > 0)
  return modifiedLines
}


// Returns string for the block, so we can scroll to the specific result (from the search results)
export function getSearchIDString(blockId: string): string {
  return blockId ? "search-" + blockId : ""
}


// Returns class for variants
export function getVariantClass(variant: string): string {
  // It needs the space in front, otherwise it will not work
  return variant ? " variant-" + variant : ""
}

// Normalize the string for seach (lower case, remove stop words, remove emojis, etc.)
export function normalizeStringForSearch(sentence: string): string  {
  const common = getStopWords();
  let wordArr = sentence.match(/[\w-]+/g), // match all words and dash, nothing else
      commonObj = {},
      word, i;
   let uncommonArr : string[] = [];
   
  for (i = 0; i < common.length; i++) {
      commonObj[ common[i].trim() ] = true;
  }
  if (!wordArr) {
      return "";
  }

  for (i = 0; i < wordArr.length; i++) {
      word = wordArr[i].trim().toLowerCase();
      
      if (!commonObj[word]) {
          uncommonArr.push(word);
      }
  }
  
  return uncommonArr.toString().replace(/,/g, " ");
}

function getStopWords(): Array<string> {
  return ["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "often", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your", "ain't", "aren't", "can't", "could've", "couldn't", "didn't", "doesn't", "don't", "hasn't", "he'd", "he'll", "he's", "how'd", "how'll", "how's", "i'd", "i'll", "i'm", "i've", "isn't", "it's", "might've", "mightn't", "must've", "mustn't", "shan't", "she'd", "she'll", "she's", "should've", "shouldn't", "that'll", "that's", "there's", "they'd", "they'll", "they're", "they've", "wasn't", "we'd", "we'll", "we're", "weren't", "what'd", "what's", "when'd", "when'll", "when's", "where'd", "where'll", "where's", "who'd", "who'll", "who's", "why'd", "why'll", "why's", "won't", "would've", "wouldn't", "you'd", "you'll", "you're", "you've"];
}