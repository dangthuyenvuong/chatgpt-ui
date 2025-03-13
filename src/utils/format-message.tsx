import type React from "react"

export function formatAIMessage(content: string): React.ReactNode {
  // Split the content by new lines
  const lines = content.split("\n")

  // Process the lines
  return lines.map((line, index) => {
    // Handle headings (lines starting with #)
    if (line.startsWith("# ")) {
      return (
        <h1 key={index} className="text-2xl font-bold my-3">
          {line.substring(2)}
        </h1>
      )
    }
    if (line.startsWith("## ")) {
      return (
        <h2 key={index} className="text-xl font-bold my-2">
          {line.substring(3)}
        </h2>
      )
    }
    if (line.startsWith("### ")) {
      return (
        <h3 key={index} className="text-lg font-bold my-2">
          {line.substring(4)}
        </h3>
      )
    }

    // Handle bold text (text between **)
    let formattedLine = line
    const boldMatches = line.match(/\*\*(.*?)\*\*/g)
    if (boldMatches) {
      boldMatches.forEach((match) => {
        const text = match.substring(2, match.length - 2)
        formattedLine = formattedLine.replace(match, `<strong>${text}</strong>`)
      })
    }

    // Handle lists (lines starting with - or *)
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      return (
        <div key={index} className="flex items-start my-1">
          <span className="mr-2">•</span>
          <span dangerouslySetInnerHTML={{ __html: formattedLine.substring(2) }} />
        </div>
      )
    }

    // Handle numbered lists (lines starting with 1., 2., etc.)
    const numberedListMatch = line.trim().match(/^(\d+)\.\s(.*)$/)
    if (numberedListMatch) {
      return (
        <div key={index} className="flex items-start my-1">
          <span className="mr-2">{numberedListMatch[1]}.</span>
          <span dangerouslySetInnerHTML={{ __html: numberedListMatch[2] }} />
        </div>
      )
    }

    // Handle empty lines
    if (line.trim() === "") {
      return <div key={index} className="h-4"></div>
    }

    // Regular paragraph
    return <p key={index} className="my-2" dangerouslySetInnerHTML={{ __html: formattedLine }} />
  })
}

