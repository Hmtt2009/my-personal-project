# AI Engineering Handbook: LLMs, RAG, Agents & System Design

Source: Exemplar (handbook.exemplar.dev)

Original URL: https://handbook.exemplar.dev/ai_engineer/ai_agents

## 1. Introduction: Who is an AI Engineer?

AI Engineers are specialized experts focused on the design, development, and deployment of AI systems. Unlike ML Engineers who build models from scratch, AI Engineers leverage pre-trained models and existing tools to solve practical challenges.

Core Responsibilities:

- Designing applications for natural language understanding and generation.
- Integrating external knowledge into LLMs.
- Developing autonomous agents and multi-agent systems.
- Scaling AI infrastructure for production.

AI Engineer vs. ML Engineer:

- AI Engineer: Focuses on application, system integration, prompt engineering, and model customization.
- ML Engineer: Focuses on model architecture, training, data pipelines, and core ML infrastructure.

## 2. Core Competencies

1. Prompt Engineering: Zero-shot, few-shot, CoT, and ToT approaches.
2. Model Selection: Balancing open-source vs. proprietary models based on cost and performance.
3. Knowledge Integration: Building RAG systems and managing vector databases.
4. Agent Development: Implementing ReAct patterns and autonomous workflows.
5. Customization: Fine-tuning models using PEFT and RLHF.

## 3. Module 1: Large Language Models (LLMs)

LLMs are the "brain" of modern AI systems. Key operations include:

- Decoding and Sampling: Managing how the model selects the next token.
- Multi-Modal AI: Integrating text, image, and audio inputs.
- LLM Operations (LLMOps): Reliability, versioning, and monitoring.

Vocabulary:

- Embeddings: Mathematical vectors representing the semantic meaning of data.
- Context Window: The limit of information a model can process at once.
- Hallucination: When a model generates factually incorrect but confident-sounding text.

## 4. Module 2: Prompt Engineering

Prompt engineering is the art of shaping model behavior through carefully crafted instructions.

Advanced Techniques:

- Chain-of-Thought (CoT): Encouraging the model to explain its reasoning step-by-step.
- Tree-of-Thoughts (ToT): Exploring multiple reasoning paths simultaneously.
- ReAct Prompting: Combining reasoning and acting to allow the model to use tools.
- Constitutional Prompting: Using rules to ensure ethical and safe outputs.

Security (Prompt Hacking):

- Prompt Injection: Attempting to bypass the model's instructions.
- Prompt Leaking: Forcing the model to reveal its system prompt.

## 5. Module 3: Vector Databases & Similarity Search

Vector databases allow AI systems to retrieve relevant information based on semantic similarity rather than keyword matching.

Similarity Search Metrics:

- Euclidean Distance: Measures straight-line distance.
- Cosine Similarity: Measures the angle between vectors.

Search Algorithms:

- HNSW (Hierarchical Navigable Small World): Efficient, graph-based search.
- IVF (Inverted File Index): Divides the space into clusters for faster retrieval.
- LSH (Locality-Sensitive Hashing): Uses hash functions to bucket similar vectors.

## 6. Module 4: Retrieval-Augmented Generation (RAG)

RAG enhances LLM responses by incorporating external knowledge fetched from a database.

RAG Paradigms:

- Self-RAG: An autonomous architecture that evaluates and improves its own retrieval.
- Iterative RAG: Uses feedback loops to progressively refine the response.
- XAI RAG: Focuses on transparency and explainability in decision paths.
- Context Cache RAG: Manages session-based context for consistent long-term interactions.

RAG vs. Fine-tuning:

- RAG: Best for providing up-to-date, factual information.
- Fine-tuning: Best for teaching a model a specific style, format, or deep domain specialized knowledge.

## 7. Module 5: Cache-Augmented Generation (CAG)

CAG is a high-performance alternative to RAG.

- How it works: Instead of querying a vector database for every request, CAG maintains a cache of frequently used contexts.
- Performance: CAG can achieve up to 40x faster response times compared to RAG by eliminating database overhead.
- Best for: Situations where speed is critical, queries are repetitive, and context data changes infrequently.

## 8. Module 6: AI Agents

An AI agent is an autonomous system that uses an LLM to perceive, reason, and act to achieve a goal.

Anatomy:

- Sensors (Input): Receives text, API feeds, or file data.
- Processing Unit (Brain): The LLM that holds the knowledge base and reasoning engine.
- Actions (Output): Interacting with tools, databases, or users.

Types of Agents:

- Simple Reflex: Operates on "if-then" rules with no memory.
- Model-Based: Maintains internal state and considers how the world evolves.
- Goal-Based: Works toward specific objectives and plans actions.
- Learning: Improves performance over time based on experience.

Architectural Patterns:

- Workflows: Structured, predefined sequences (Parallelization, Prompt Chaining).
- Agents: Dynamic systems that decide tool usage and process flow on the fly.

## 9. Module 7: AI Development Lifecycle (SDLC)

Modern AI engineering leverages specific tools to accelerate development:

- Feature Flags: Used for rapid testing and safe deployment of AI features.
- Vibe Coding: A rapid, experimental development style.
- AI-Native IDEs: Using tools like Cursor for context-aware code generation.
- Evaluation Tools: Measuring latency, accuracy, and cost of LLM outputs.

## 10. Ethics, Security & Governance

- Authorization: Implementing robust access controls for LLM systems.
- Bias Mitigation: Reducing unwanted biases in prompt design and responses.
- Compliance: Ensuring adherence to data privacy regulations, such as GDPR.
- Safety Guidelines: Implementing emergency stops and constraints for autonomous agents.

## References

- Rise of an AI Engineer
- AI Engineering Handbook (Exemplar)
- Prompt Engineering Guide (dair-ai)
- Common LLM Customization Strategies
