---
title: "AI Engineering Handbook: LLMs, RAG, Agents, and System Design"
bigIdea: "AI engineering is about building useful AI systems by connecting language models, knowledge, tools, and safety rules."
description: "A simple, complete explanation of the main ideas behind AI engineers, LLMs, prompt engineering, vector search, RAG, CAG, agents, AI development, and governance."
sourceType: "handbook excerpt"
status: "draft"
createdAt: "2026-05-06"
updatedAt: "2026-05-06"
sourceRef:
  - "content/sources/ai-engineering-handbook/source.md"
  - "https://handbook.exemplar.dev/ai_engineer/ai_agents"
---

# AI Engineering Handbook: LLMs, RAG, Agents, and System Design

## One-sentence big idea

AI engineering is about using powerful AI models and tools to build real systems that help people solve real problems.

## Why this matters

AI is not just a model sitting alone.

A useful AI product needs many parts working together.

It may need a language model, good instructions, outside knowledge, tools, memory, safety rules, and testing.

An AI engineer is the person who helps connect these parts into something that works.

## Simple explanation

### What is an AI engineer?

An AI engineer builds applications that use AI.

They usually do not train a huge model from zero.

Instead, they use models that already exist.

Then they connect those models to useful tools, data, and product features.

Think of a model like a very smart engine.

The AI engineer builds the car around the engine.

They decide how the user talks to it.

They decide what information it can use.

They decide what tools it can call.

They also help make sure the system is safe, useful, and reliable.

### AI engineer vs. ML engineer

An AI engineer and an ML engineer are related, but they focus on different things.

An AI engineer focuses on using AI in real applications.

They care about prompts, tools, agents, RAG, system design, and production behavior.

An ML engineer focuses more on the model itself.

They may work on model training, data pipelines, model architecture, and machine learning infrastructure.

Simple way to remember it:

- AI engineer: builds with existing AI models.
- ML engineer: often builds, trains, or improves the models themselves.

### What does an AI engineer need to know?

An AI engineer needs several skills.

They need prompt engineering.

This means writing instructions that help the model behave in the right way.

They need model selection.

This means choosing the right model for the job.

Some models are cheap and fast.

Some are stronger but more expensive.

They need knowledge integration.

This means giving the model access to useful information that was not already inside its training.

They need agent development.

This means building systems that can reason, use tools, and take actions.

They may also need customization.

This means adapting a model to a task, a style, or a domain.

### Large Language Models

A Large Language Model, or LLM, is like the brain of many modern AI systems.

It reads text and predicts what should come next.

That sounds simple, but it can create answers, explain ideas, write code, summarize text, and follow instructions.

LLMs have important limits.

One limit is the context window.

The context window is how much information the model can look at at one time.

If the text is too large, the model cannot see all of it at once.

Another issue is hallucination.

Hallucination means the model says something that sounds true but is wrong.

This is why AI systems often need outside knowledge, checks, and careful design.

LLMs can also be multi-modal.

Multi-modal means the system can work with more than one kind of input.

For example, text, images, or audio.

### Prompt engineering

Prompt engineering means shaping the model's behavior with clear instructions.

A prompt is the message or instruction you give to the model.

A weak prompt can lead to a weak answer.

A clear prompt can help the model do better.

There are different prompt techniques.

Zero-shot prompting means asking the model to do a task without giving examples.

Few-shot prompting means giving the model a few examples first.

Chain-of-Thought prompting asks the model to work through a problem step by step.

Tree-of-Thoughts prompting explores more than one possible path before choosing an answer.

ReAct prompting mixes reasoning with action.

The model thinks about what to do, then uses a tool, then continues.

Constitutional prompting gives the model rules to follow.

These rules help keep the output safer and more aligned with what is allowed.

Prompt security is also important.

Prompt injection is when someone tries to trick the model into ignoring its real instructions.

Prompt leaking is when someone tries to make the model reveal private instructions.

### Vector databases and similarity search

A vector database helps an AI system find information by meaning.

Normal search often looks for matching words.

Vector search looks for matching meaning.

To do this, text is turned into embeddings.

Embeddings are number lists that represent meaning.

If two pieces of text have similar meaning, their embeddings are close to each other.

Similarity search is how the system finds the closest pieces of information.

Cosine similarity compares the angle between two vectors.

Euclidean distance compares the straight-line distance between two vectors.

There are also search methods that make finding similar vectors faster.

HNSW uses a graph-like structure.

IVF groups vectors into clusters.

LSH uses hashing to place similar things into similar buckets.

You do not need to memorize the math first.

The simple idea is this:

A vector database helps the AI find information that means the same thing, even if the words are different.

### Retrieval-Augmented Generation

Retrieval-Augmented Generation is called RAG.

RAG helps an LLM answer using outside knowledge.

The system first retrieves useful information from a database.

Then it gives that information to the LLM.

Then the LLM writes an answer using that information.

This is useful when answers need to be factual or up to date.

For example, a company assistant may need to answer from company documents.

The model may not know those documents by itself.

RAG gives the documents to the model at the right time.

There are different types of RAG.

Self-RAG lets the system check and improve its own retrieval.

Iterative RAG uses feedback loops to refine the answer.

XAI RAG focuses on making the reasoning easier to explain.

Context Cache RAG keeps useful context across a session.

RAG is different from fine-tuning.

RAG is best when the system needs fresh facts or outside knowledge.

Fine-tuning is better when you want to teach the model a style, format, or special domain behavior.

### Cache-Augmented Generation

Cache-Augmented Generation is called CAG.

CAG is like keeping useful information ready in a fast-access box.

Instead of searching a database every time, the system uses cached context.

This can be much faster.

The source says CAG can be up to 40 times faster than RAG in some cases because it removes database overhead.

CAG is useful when speed matters.

It is also useful when many questions repeat.

It works best when the context does not change very often.

### AI agents

An AI agent is a system that can work toward a goal.

It uses an LLM to understand, reason, and act.

A simple chatbot mostly answers messages.

An agent can do more.

It may read information, decide what tool to use, call that tool, look at the result, and continue.

An agent has three basic parts.

First, it has sensors.

Sensors are how it receives input.

This could be text, files, API data, or user messages.

Second, it has a processing unit.

This is the brain.

Usually, the brain is an LLM plus instructions and context.

Third, it has actions.

Actions are what it can do.

It might call a tool, update a file, search a database, or respond to a user.

There are different types of agents.

A simple reflex agent follows if-then rules.

It does not really remember much.

A model-based agent keeps an internal picture of what is happening.

A goal-based agent plans actions to reach a goal.

A learning agent improves from experience.

### Workflows vs. agents

Workflows and agents are not the same.

A workflow follows a planned path.

For example:

First summarize the text.

Then extract action items.

Then write an email.

The steps are known ahead of time.

An agent is more flexible.

It can decide which tool to use and what step to take next.

This makes agents powerful.

It also makes them riskier if they are not controlled.

Simple rule:

Use workflows when the steps are clear.

Use agents when the system needs to decide the path on its own.

### AI development lifecycle

Building AI systems needs a development process.

This is sometimes called the AI development lifecycle.

Teams use feature flags to test AI features safely.

A feature flag lets a team turn a feature on or off without changing the whole app.

Some people use vibe coding.

Vibe coding means building quickly with AI help and experimenting fast.

AI-native IDEs, like Cursor, help developers write and understand code with AI inside the editor.

Evaluation tools are also important.

They measure things like speed, accuracy, and cost.

This matters because an AI feature is not good just because it answers.

It also needs to be reliable, affordable, and fast enough.

### Ethics, security, and governance

AI systems need rules and safety.

Authorization means controlling who is allowed to do what.

For example, not every user should be allowed to access private data.

Bias mitigation means reducing unfair or unwanted bias in answers.

Compliance means following rules and laws, like data privacy laws.

Safety guidelines are limits that keep an AI system from doing dangerous things.

For autonomous agents, safety is very important.

If an agent can take actions, it needs constraints.

A system may need emergency stops.

It may need permission checks.

It may need logs so humans can review what happened.

## Step-by-step breakdown

1. Start with the model.

   The LLM is the brain that understands and writes language.

2. Give the model good instructions.

   Prompt engineering helps the model behave in the right way.

3. Add outside knowledge when needed.

   RAG and vector databases help the model use information from documents and databases.

4. Add speed improvements when the context repeats.

   CAG can make repeated context faster by using a cache.

5. Add tools and actions if the system needs to do tasks.

   This is where agents become useful.

6. Add testing and monitoring.

   The system needs checks for quality, latency, accuracy, and cost.

7. Add safety and governance.

   The system needs access control, bias checks, compliance, and safety limits.

## Key terms

AI engineer: a person who builds useful applications with AI models and tools.

ML engineer: a person who often works more deeply on model training, model architecture, and machine learning infrastructure.

LLM: a large language model that can understand and generate text.

Prompt: the instruction or message given to the model.

Prompt engineering: writing prompts that guide the model toward better behavior.

Embedding: a list of numbers that represents the meaning of text or data.

Vector database: a database that stores embeddings and helps find information by meaning.

Context window: the amount of information a model can look at in one request.

Hallucination: when a model says something wrong but sounds confident.

RAG: a system that retrieves outside knowledge and gives it to the model before it answers.

Fine-tuning: changing or adapting a model so it learns a style, task, or domain better.

CAG: a system that uses cached context to answer faster when information repeats.

Agent: an AI system that can work toward a goal by reasoning and taking actions.

Workflow: a fixed set of steps that happen in a planned order.

Authorization: rules that decide who can access or do something.

Compliance: following laws, rules, or policies.

## Tiny examples

### Example 1: RAG

Imagine you ask a school helper AI, "What is our homework today?"

The AI does not guess.

First, it checks the class homework document.

Then it answers using that document.

That is the idea of RAG.

### Example 2: Vector search

Imagine you search for "cars."

A normal search may only look for the word "cars."

A vector search may also find "vehicles" because the meaning is close.

### Example 3: Agent

Imagine an AI travel helper.

You say, "Plan my trip."

It checks flights.

It checks hotels.

It compares prices.

Then it gives you a plan.

That is closer to an agent because it uses tools and takes steps toward a goal.

### Example 4: Workflow

Imagine an AI that always does three steps:

1. Read a meeting transcript.
2. Extract tasks.
3. Write a follow-up email.

That is a workflow because the steps are fixed.

## Suggested visual

Type: System diagram.

Purpose: Show that AI engineering connects several parts into one useful system.

Description: A simple left-to-right diagram that starts with a user goal, passes through the main AI engineering parts, and ends with a useful AI system.

Labels:

- "User goal"
- "LLM brain"
- "Instructions and prompts"
- "Knowledge: RAG, vectors, cache"
- "Tools and actions"
- "Useful AI system"

Layout idea: Put "User goal" on the left. Draw arrows from it to four middle boxes:

1. "LLM brain"
2. "Instructions and prompts"
3. "Knowledge: RAG, vectors, cache"
4. "Tools and actions"

Then draw arrows from those four boxes into one final box on the right called "Useful AI system."

What to notice: AI engineering connects the model, instructions, knowledge, and tools so the system can solve a real problem.

## Common confusion

### Confusion 1: AI engineering is the same as machine learning engineering

They overlap, but they are not the same.

AI engineering usually focuses on using existing models to build systems.

Machine learning engineering often focuses more on training and model infrastructure.

### Confusion 2: RAG and fine-tuning solve the same problem

They are different tools.

RAG gives the model outside information at answer time.

Fine-tuning changes how the model behaves or what style it follows.

### Confusion 3: Every AI system should be an agent

No.

If the steps are clear, a workflow may be safer and simpler.

Use agents when the system really needs flexible decisions.

### Confusion 4: A model is the whole product

No.

The model is only one part.

The full product also needs data, tools, interface, testing, monitoring, and safety.

## What you should remember

AI engineering is about building real AI systems, not just talking to a model.

An AI engineer connects models, prompts, knowledge, tools, evaluation, and safety.

LLMs are powerful, but they need good system design.

RAG helps models use outside knowledge.

CAG helps when repeated context needs to be fast.

Agents can reason and act, but they need guardrails.

Workflows are better when the steps are clear.

Safety, security, and governance matter because AI systems can affect real people and real data.

## Optional next questions

- What is the difference between a workflow and an agent in a real product?
- When should I use RAG instead of fine-tuning?
- What makes an AI agent dangerous if it has too much freedom?
- How do vector databases find similar meaning?
- What skills should I learn first if I want to become an AI engineer?
