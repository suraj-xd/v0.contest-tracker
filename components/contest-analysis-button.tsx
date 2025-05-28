"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Contest } from "@/types/contest"
import Image from "next/image"

interface ContestAnalysisButtonProps {
  contest: Contest
  className?: string
}

export default function ContestAnalysisButton({ contest, className }: ContestAnalysisButtonProps) {
  const handleAnalyzeClick = () => {
    // Create the analysis prompt with the specific contest name
    const prompt = `Analyze the ${contest.platform} ${contest.title}, delivering a focused breakdown of problem-solving strategies and actionable learning. Structure your response as follows:

**1. Problem Breakdown (Summarized & Categorized):**

* Categorize the contest problems by core algorithmic concepts (e.g., Graph Theory, Dynamic Programming, String Manipulation, Combinatorics, Simulation).
* For each category, concisely summarize the problem type and provide a representative example.
* Identify the key constraints and challenges that contributed to the problem's difficulty.

**2. Solution Strategies & Best Approaches:**

* For each problem type, detail the most effective solution approaches.
* List the essential algorithms and data structures utilized (e.g., Trie, DFS/BFS, Two Pointers, Backtracking, Hashing).
* Explain the time and space complexity of each solution, justifying its optimality.
* Provide clear, concise code snippets or pseudocode to illustrate the implementation of these solutions.
* Provide links to youtube videos that explain the approaches.

**3. Key Learnings & Takeaways:**

* Extract the core problem-solving techniques that participants can learn and apply.
* Demonstrate how these learned concepts translate to other coding contests and real-world scenarios.
* Identify common mistakes made during the contest and offer strategies to avoid them.
* Highlight effective code optimization techniques and debugging methodologies employed.

**4. Learning Resources & Practice:**

* Provide links to relevant and insightful video solutions on YouTube.
* Recommend articles or blog posts for in-depth exploration of the concepts.
* Suggest similar practice problems on LeetCode or Codeforces to reinforce the learned skills.

Deliver a structured, concise, and actionable analysis that caters to both beginner and advanced problem solvers. 🚀`

    // Encode the prompt for URL
    const encodedPrompt = encodeURIComponent(prompt)

    // Open ChatGPT with the prompt
    window.open(`https://chatgpt.com/?q=${encodedPrompt}`, "_blank")
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAnalyzeClick}
            className={`h-8 w-8 transition-transform duration-200 hover:scale-110 ${className}`}
            aria-label="AI Analysis"
          >
            <Image
              src="https://img.icons8.com/?size=512&id=iGqse5s20iex&format=png"
              alt="ChatGPT"
              width={20}
              height={20}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Generate AI analysis of this contest</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

