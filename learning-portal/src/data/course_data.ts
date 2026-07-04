export interface VideoDetail {
  title: string;
  url: string;
  duration: string;
  provider: string;
  category: "Overview" | "Deep Dive" | "Lecture" | "Enterprise" | "Research";
  instructor: string;
  year: number;
  whyRecommended: string;
  learningObjectives: string[];
  prerequisites: string[];
  timestamps: { time: string; label: string }[];
  summary: string;
}

export interface QuizQuestion {
  question: string;
  type: "mcq" | "scenario";
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface CodeWalkthrough {
  language: string;
  code: string;
  architectureDescription: string;
  bestPractices: string[];
  productionNotes: string;
}

export interface DayData {
  id: number;
  week: number;
  title: string;
  topic: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  learningTime: string;
  prerequisites: string[];
  industryUsage: string;
  learningOutcomes: string[];
  overviewText: string;
  whyMatters: string;
  examples: string[];
  story: string;
  analogyTitle: string;
  analogyContent: string;
  memoryHook: string;
  mnemonics: string[];
  architectureSteps: string[];
  architectureDetails: { [key: string]: string };
  bankingUseCase: {
    title: string;
    description: string;
    implementation: string;
  };
  codeWalkthrough?: CodeWalkthrough;
  commonMistakes: {
    beginner: string;
    performance: string;
    scaling: string;
    security: string;
    cost: string;
    traps: string;
  };
  interviewQuestions: {
    beginner: { q: string; a: string };
    intermediate: { q: string; a: string };
    senior: { q: string; a: string };
    architect: { q: string; a: string };
    systemDesign: { q: string; a: string };
    behavioral: { q: string; a: string };
  };
  assignment: string;
  quizzes: QuizQuestion[];
  flashcards: Flashcard[];
  revisionSummary: string;
  importantFormulas?: string[];
  tutorResponses: {
    eli5: string;
    college: string;
    senior: string;
    architect: string;
    banking: string;
    story: string;
  };
  videos: VideoDetail[];
  advantages: string[];
  disadvantages: string[];
  connections: {
    previous: string;
    next: string;
    related: string[];
  };
}

export const topics = [
  "LLM Fundamentals",
  "Prompt Engineering",
  "RAG",
  "Embeddings",
  "Vector Databases",
  "AI Agents",
  "MCP",
  "LLMOps / MLOps",
  "Security",
  "Cloud",
  "Backend Engineering",
  "Banking Domain Knowledge"
];

// Rich, specialized Metadata Dictionary for the 12 weekly modules
interface TopicMetadata {
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  overview: string;
  whyMatters: string;
  examples: string[];
  story: string;
  analogyTitle: string;
  analogyContent: string;
  memoryHook: string;
  mnemonics: string[];
  architectureSteps: string[];
  architectureDetails: { [key: string]: string };
  bankingUseCase: {
    title: string;
    description: string;
    implementation: string;
  };
  commonMistakes: {
    beginner: string;
    performance: string;
    scaling: string;
    security: string;
    cost: string;
    traps: string;
  };
  interviewQuestions: {
    beginner: { q: string; a: string };
    intermediate: { q: string; a: string };
    senior: { q: string; a: string };
    architect: { q: string; a: string };
    systemDesign: { q: string; a: string };
    behavioral: { q: string; a: string };
  };
  assignment: string;
  quizzes: QuizQuestion[];
  flashcards: Flashcard[];
  revisionSummary: string;
  tutorResponses: {
    eli5: string;
    college: string;
    senior: string;
    architect: string;
    banking: string;
    story: string;
  };
  videos: VideoDetail[];
  advantages?: string[];
  disadvantages?: string[];
}

const topicMetadataMap: { [key: string]: TopicMetadata } = {
  "LLM Fundamentals": {
    difficulty: "Advanced",
    overview: "LLM Fundamentals cover the core transformer architectures, attention pathways, word encodings, and model scaling laws that dictate text generation patterns.",
    whyMatters: "Understanding these parameters dictates how context limits are handled in production and why models hallucinate during retrieval tasks.",
    examples: ["GPT-4o", "Claude 3.5 Sonnet", "Llama 3.1"],
    story: "Imagine a giant conference hall containing 200 subject experts. Instead of passing notes sequentially like an old RNN chain, they all look at each other simultaneously. When a query is raised, they calculate connections in parallel. This represents transformer attention routing.",
    analogyTitle: "The Parallel Meeting Room",
    analogyContent: "Self-Attention is like a meeting room where everyone listens to everyone else simultaneously. The Query represents a token's question, the Key is a token's profile matching, and the Value is the actual semantic weight passed forward.",
    memoryHook: "TRANSFORM: Tokens, Relations, Attention, Network, Sequence.",
    mnemonics: ["QKV: Queen (Query) matches Key to assemble Value"],
    architectureSteps: ["Token Embeddings", "Positional Wave Adding", "Attention Blocks", "Softmax vocabulary projection"],
    architectureDetails: {
      "Token Embeddings": "Convert words to multi-dimensional coordinate lists.",
      "Positional Wave Adding": "Inject indices sequence order indices.",
      "Attention Blocks": "Calculate QKᵀ matrix mapping scores.",
      "Softmax vocabulary projection": "Determine probabilities for next token selections."
    },
    bankingUseCase: {
      title: "CBA Mortgage Document Extraction",
      description: "Extracting borrower details from 100-page loan papers.",
      implementation: "Run a decoder-only attention mask framework to target numerical wage fields."
    },
    commonMistakes: {
      beginner: "Assuming attention is a simple keyword match (it maps deep semantic context).",
      performance: "Neglecting KV-caching during token generation, causing slow API response times.",
      scaling: "Exceeding model context size thresholds without segmenting document strings.",
      security: "Passing unmasked raw logs directly into external model parameter pools.",
      cost: "Processing massive prompt histories repeatedly instead of caching prefixes.",
      traps: "Assuming LLMs can solve complex mathematical calculations reliably inside attention layers."
    },
    interviewQuestions: {
      beginner: { q: "What is the difference between Encoder and Decoder LLM architectures?", a: "Encoders see the whole sequence (e.g. BERT for embeddings). Decoders use causal masking to look only at past tokens to predict next tokens (e.g. GPT)." },
      intermediate: { q: "Why do we divide by sqrt(d_k) in Scaled Dot-Product Attention?", a: "As embedding dimension d_k grows, dot products grow large in magnitude, pushing softmax into flat regions with vanishing gradients. Scaling prevents this." },
      senior: { q: "Explain KV-Caching.", a: "Saves Key and Value attention matrices of previous tokens in GPU memory during token generation, changing processing cost from O(N^2) to O(1) per token." },
      architect: { q: "Design a failover pipeline for Bedrock LLM calls.", a: "VPC Endpoint ➔ API Gateway with circuit breaker ➔ primary Claude-3.5 ➔ fallback Claude-Haiku ➔ tertiary local Llama-8B." },
      systemDesign: { q: "How would you design a real-time transaction summary parser?", a: "Scrub logs locally using Microsoft Presidio ➔ feed tokens to a high-speed Llama-3-8b endpoint ➔ cache outputs in Redis." },
      behavioral: { q: "How did you manage a stakeholder demanding a 70B model for simple classification?", a: "I ran a benchmark test showing a structured 8B model had 98.4% accuracy at 1/10th the cost and latency, saving thousands." }
    },
    assignment: "Write a Python script using numpy to build a basic Scaled Dot-Product Attention calculation matrix.",
    quizzes: [
      {
        question: "Which mechanism allows transformers to process all words in parallel?",
        type: "mcq",
        options: ["Recurrent hidden states", "Self-Attention pathway", "Softmax vocabulary projection", "Layer Normalization"],
        correctIndex: 1,
        explanation: "Self-attention processes sequence relationships concurrently, bypassing sequential RNN loops."
      }
    ],
    flashcards: [
      { front: "Attention Equation", back: "Attention(Q,K,V) = softmax(QKᵀ / √d_k)V" }
    ],
    revisionSummary: "Transformers parse sequences in parallel. Positional encodings capture order. Scaled attention avoids gradient vanishes.",
    tutorResponses: {
      eli5: "Imagine words are children at a playground. Self-attention is like everyone playing catch: they throw the ball directly to who is most ready to catch it, not just the next child in line.",
      college: "Transformers utilize bi-directional self-attention modules to create representation matrices. Softmax yields weights that merge Value representations.",
      senior: "When implementing raw transformers, verify tensor shapes. Keep track of memory boundaries during backpropagation steps.",
      architect: "Deploy local endpoints via Docker. Implement prefix caching to optimize token throughput latency.",
      banking: "All models at CBA must pass bias audits (ASIC standards) before processing customer account files.",
      story: "A bank officer had to copy loan details by hand. We wrote a transformer pipeline: it read the files, mapped attention to financial variables, and filled out the database."
    },
    videos: [
      {
        title: "Transformers Chapter 5",
        url: "https://www.youtube.com/watch?v=wjZofJX0v4M",
        duration: "27m",
        provider: "3Blue1Brown",
        category: "Overview",
        instructor: "Grant Sanderson",
        year: 2024,
        whyRecommended: "The absolute best visual overview of transformer coordinate states.",
        learningObjectives: ["Understand embeddings", "Visualize matrix changes"],
        prerequisites: ["Linear algebra"],
        timestamps: [{ time: "00:00", label: "Intro" }],
        summary: "Visual guide to GPT layers."
      }
    ]
  },
  "Prompt Engineering": {
    difficulty: "Intermediate",
    overview: "Prompt Engineering is the science of structuring instructions, schemas, and examples to guide model output formatting and logical patterns.",
    whyMatters: "Well-structured system prompts prevent formatting failures and reduce model hallucinations in production backend adapters.",
    examples: ["Few-Shot templates", "XML boundary tags", "Chain-of-Thought structures"],
    story: "A supervisor delegates auditing files to a new clerk. If they just say 'find problems', the clerk returns random notes. If they give a clear checklist, XML template blocks, and 2 sample cases, the clerk does a perfect job. That is Prompt Engineering.",
    analogyTitle: "The Auditor Checklist",
    analogyContent: "Prompt engineering is like writing a standard operating procedure (SOP) for a temporary worker. The clearer the structure (XML tags, few-shot examples), the fewer mistakes they make.",
    memoryHook: "PROMPT: Profile, Rule, Objective, Mock-cases, Template.",
    mnemonics: ["REACT: Reason, Act, Observe loop in prompts"],
    architectureSteps: ["System instructions parsing", "Few-shot injection", "XML tag wrapping", "Structured Pydantic schema validation"],
    architectureDetails: {
      "System instructions parsing": "Binds model persona and security rules.",
      "Few-shot injection": "Injects target format sample pairs.",
      "XML tag wrapping": "Delineates context chunks from query inputs.",
      "Structured Pydantic schema validation": "Checks outputs match expected JSON variables."
    },
    bankingUseCase: {
      title: "Credit Card Dispute Router",
      description: "Classifying incoming dispute claims into account categories.",
      implementation: "Use XML tag prompt structures to separate query strings from classification indices."
    },
    commonMistakes: {
      beginner: "Writing prompts like a text message instead of structured templates.",
      performance: "Passing massive context instructions on every single API call without caching.",
      scaling: "Not designing guardrails against prompt injection leaks in query fields.",
      security: "Allowing users to override system personas by injecting custom instructions.",
      cost: "Injecting massive irrelevant few-shot examples that consume API token budgets.",
      traps: "Assuming the LLM will always conform to output formats without programmatic JSON validation."
    },
    interviewQuestions: {
      beginner: { q: "What is Few-Shot prompting?", a: "Injecting 1-5 completed input-output example pairs into the prompt template to show the model the target style." },
      intermediate: { q: "Explain Chain-of-Thought (CoT) prompting.", a: "Guiding the model to output its step-by-step reasoning ('Let's think step by step') before outputting the final answer, reducing logical slips." },
      senior: { q: "How do you protect a production prompt against injection?", a: "Wrap user input inside strict XML tags (e.g. <user_query>{{INPUT}}</user_query>) and add system rules dictating the model must ignore commands inside those tags." },
      architect: { q: "How do you handle prompt versioning in enterprise deployments?", a: "Decouple prompts from source code. Save template version strings in databases or registries (like Langchain Hub) and fetch them async." },
      systemDesign: { q: "Design a validation gateway for LLM JSON outputs.", a: "Inject Pydantic schema schemas into system prompt ➔ request JSON format ➔ parse LLM response via Pydantic ➔ on JSONDecodeError, trigger a retry with the error trace." },
      behavioral: { q: "Describe how you debugged a system prompt that was leaking customer PII.", a: "I created an automated evaluation test suite with adversarial queries, identified where instructions relaxed, and added system-level filtering." }
    },
    assignment: "Write a system prompt template that forces a model to output disputes in a valid JSON format citing card numbers, category, and disputed values.",
    quizzes: [
      {
        question: "Which prompting technique works best for complex logic problems?",
        type: "mcq",
        options: ["Zero-shot instruction", "Chain-of-Thought (CoT)", "Iterative prompts", "Style transfer"],
        correctIndex: 1,
        explanation: "Chain-of-thought forces the model to trace logical transitions, reducing calculation errors."
      }
    ],
    flashcards: [
      { front: "ReAct framework core loop", back: "Reasoning (thought) ➔ Action (tool call) ➔ Observation (tool output)" }
    ],
    revisionSummary: "Use structured layouts with XML tags. Use few-shots to show formats. Implement strict guardrails against injections.",
    tutorResponses: {
      eli5: "Imagine showing a child how to paint by painting one flower first, then asking them to copy the style. That is few-shot prompting!",
      college: "Prompt engineering establishes activation constraints inside LLM semantic fields, steering token generation path vectors.",
      senior: "Always separate system personas from user query payloads. Build automated tests to measure prompt degradation over model updates.",
      architect: "Deploy prompts as micro-configs. Implement automated evaluation metrics to audit prompt performance changes.",
      banking: "All prompts handling CBA data must enforce data isolation rules to satisfy compliance audits.",
      story: "Our customer service LLM kept returning conversational chatter instead of code blocks. We wrapped the prompt in XML instructions, forcing a strict JSON schema, which solved the integration issues."
    },
    videos: [
      {
        title: "Andrej Karpathy: Intro to LLMs",
        url: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
        duration: "1h 0m",
        provider: "Andrej Karpathy",
        category: "Lecture",
        instructor: "Andrej Karpathy",
        year: 2023,
        whyRecommended: "Explains how prompts operate as instruction sets inside model files.",
        learningObjectives: ["Understand training", "Identify prompt boundaries"],
        prerequisites: ["None"],
        timestamps: [{ time: "00:00", label: "Intro" }],
        summary: "Introduction to Large Language Models."
      }
    ]
  },
  "RAG": {
    difficulty: "Advanced",
    overview: "Retrieval-Augmented Generation (RAG) is a pattern that retrieves relevant document snippets from vector indices and injects them into the context window to ground LLM responses.",
    whyMatters: "RAG bypasses model training schedules, allowing LLMs to answer queries using real-time, private, and audited corporate document databases.",
    examples: ["LlamaIndex pipelines", "LangChain Document splitters", "Dense document search"],
    story: "A student sits for a history exam. If they take it closed-book, they might confuse dates. In an open-book exam, they lookup the textbook first and cite the exact page. This is RAG.",
    analogyTitle: "The Open Book Exam",
    analogyContent: "Naive RAG is like an open-book exam: the user asks a question, the assistant finds the most relevant pages in the reference catalog (vector db), and compiles a response citing the exact source.",
    memoryHook: "RETRIEVE: Fetch files. AUGMENT: Inject into prompt. GENERATE: Output answer.",
    mnemonics: ["RAG: Retrieve, Augment, Generate"],
    architectureSteps: ["Document Chunking", "Embedding generation", "Vector Database lookup", "Reranker sorting", "LLM Prompt construction"],
    architectureDetails: {
      "Document Chunking": "Breaks large PDFs into overlapping text paragraphs.",
      "Embedding generation": "Vectorizes chunk text strings.",
      "Vector Database lookup": "Performs nearest-neighbor search for queries.",
      "Reranker sorting": "Filters and re-orders snippets by relevance.",
      "LLM Prompt construction": "Streams grounded citations answer."
    },
    bankingUseCase: {
      title: "APRA CPS 234 Compliance Search",
      description: "Answering employee queries regarding security standards.",
      implementation: "Build a RAG system indexing APRA regulatory manuals and internal audit logs."
    },
    commonMistakes: {
      beginner: "Splitting documents into arbitrary character counts without overlaps, breaking sentences.",
      performance: "Neglecting to implement a reranker layer, causing noisy/irrelevant chunks to dilute prompt focus.",
      scaling: "Failing to update vector indices when source reference files change in the cloud.",
      security: "Allowing users to search vector database collections without enforcing role-based access controls.",
      cost: "Retrieving too many chunks per query, expanding context sizes and multiplying API token costs.",
      traps: "Assuming vector search is sufficient for tabular data (RAG fails at summarizing column metrics)."
    },
    interviewQuestions: {
      beginner: { q: "What is Naive RAG?", a: "Chunking documents ➔ indexing vectors ➔ performing similarity lookup ➔ passing top results directly to LLM without reranking." },
      intermediate: { q: "Why do we use a Reranker (like Cohere)?", a: "Vector search finds semantic matches but misses exact contextual relevance. Rerankers score candidates using cross-encoders, sorting the best context to the top." },
      senior: { q: "Explain chunk size vs chunk overlap trade-offs.", a: "Smaller chunks capture specific facts but lose context. Larger chunks keep context but expand token sizes. Overlaps (e.g. 10-20%) prevent losing facts split across boundaries." },
      architect: { q: "How do you build a secure, permissioned RAG engine?", a: "Store document access meta tags in the vector index. Intercept queries, extract user role tokens, and run a metadata filter alongside vector search." },
      systemDesign: { q: "Design a real-time APRA policy audit database.", a: "PDF ingest ➔ split by document headings ➔ embed via Titan ➔ index in pgvector ➔ query with hybrid search ➔ rerank ➔ prompt Claude." },
      behavioral: { q: "How did you optimize a RAG pipeline that had 30% hallucination rates?", a: "I changed basic chunking to semantic chunking, added a Cohere reranker, and introduced a verification loop to check if output facts existed in context." }
    },
    assignment: "Create a Python file that parses a compliance PDF, splits it recursively, vectorizes chunks, and queries them locally.",
    quizzes: [
      {
        question: "Which component in a RAG pipeline re-scores candidate document chunks?",
        type: "mcq",
        options: ["Document splitter", "Embedding model", "Reranker", "Softmax classifier"],
        correctIndex: 2,
        explanation: "Rerankers apply compute-intensive cross-encoder scoring to re-order retrieved items by relevance."
      }
    ],
    flashcards: [
      { front: "RAG citation verification", back: "Checking if the model's claims are explicitly supported by retrieved context snippets." }
    ],
    revisionSummary: "Chunk documents with overlaps. Retrieve vectors. Use rerankers to filter noise. Verify output claims against context.",
    tutorResponses: {
      eli5: "RAG is like having a helpful assistant run to the library, grab the three best books for your query, and write a summary page citing the book chapters.",
      college: "RAG decouples parameterized knowledge of LLMs from non-parametric database systems, using vector similarity to contextually ground generative completions.",
      senior: "Always monitor retrieve metrics. Evaluate pipelines using Ragas metrics (faithfulness, answer relevance).",
      architect: "Set up asynchronous document pipelines. Implement hybrid search layers (BM25 combined with pgvector) to optimize recall.",
      banking: "All RAG engines auditing CBA policy files must enforce document access boundary isolation keys.",
      story: "Our support agents spent hours searching compliance manuals. We built a RAG assistant that retrieves manual passages, highlights the answers, and links the source PDFs."
    },
    videos: [
      {
        title: "Advanced RAG Pipelines",
        url: "https://www.youtube.com/watch?v=e9U0Qkl1964",
        duration: "25m",
        provider: "DeepLearning.AI",
        category: "Deep Dive",
        instructor: "Andrew Ng",
        year: 2024,
        whyRecommended: "andrew breaks down RAG retrieval logic.",
        learningObjectives: ["Understand advanced splitters", "Configure rerankers"],
        prerequisites: ["Vector search"],
        timestamps: [{ time: "00:00", label: "Intro" }],
        summary: "Introduction to Advanced RAG techniques."
      }
    ]
  },
  "Embeddings": {
    difficulty: "Intermediate",
    overview: "Embeddings are multi-dimensional vector arrays generated by neural networks that map word semantics to geometric coordinates.",
    whyMatters: "All semantic search, clustering, and vector databases operate on calculating distances between these coordinate arrays.",
    examples: ["OpenAI text-embedding-3-small", "Cohere Embed v3", "Sentence-Transformers"],
    story: "Imagine a giant map of the world. On this map, cities with similar climates sit near each other (Sydney near Melbourne). Embeddings do this for meaning: similar concepts ('withdraw' and 'debit') sit at close coordinates on a 1536-dimensional map.",
    analogyTitle: "The Semantic GPS Map",
    analogyContent: "Embeddings are like GPS coordinates for meaning. Just as Sydney and Melbourne are geographically close, the words 'bank' and 'debit' are conceptually close in vector space.",
    memoryHook: "EMBED: Every Meaning Becomes Vector Coordinates.",
    mnemonics: ["COSINE: Angle similarity between vectors"],
    architectureSteps: ["Text tokenization", "Model hidden layers pass", "Activation mapping", "Normalize vector array"],
    architectureDetails: {
      "Text tokenization": "Convert strings to input tokens.",
      "Model hidden layers pass": "Evaluate sequence contexts.",
      "Activation mapping": "Extract weight values from final pool layer.",
      "Normalize vector array": "Scale coordinate vectors to unit length 1.0."
    },
    bankingUseCase: {
      title: "Log Event Clustering",
      description: "Identifying anomalous server log alerts semantically.",
      implementation: "Generate embedding coordinates for incoming log strings and flag outlier vectors."
    },
    commonMistakes: {
      beginner: "Comparing vectors generated by different embedding models (dimensions and meanings won't align).",
      performance: "Generating embeddings on single-token phrases instead of contextual paragraphs.",
      scaling: "Calculating cosine distance using linear loops instead of utilizing indexing trees.",
      security: "Exposing sensitive PII values inside text strings to public cloud embedding APIs.",
      cost: "Repeatedly embedding static database text records instead of saving vectors.",
      traps: "Assuming higher dimensions always yield better search results (dimension alignment is model-dependent)."
    },
    interviewQuestions: {
      beginner: { q: "What is an Embedding?", a: "A list of float numbers (vector) generated by a model representing the semantic meaning of a text segment." },
      intermediate: { q: "What is Cosine Similarity?", a: "A metric that measures the cosine of the angle between two vectors, checking if their directions align, normalized between -1 and 1." },
      senior: { q: "Explain the difference between bi-encoders and cross-encoders.", a: "Bi-encoders generate embeddings for items separately and compare them via dot-products (fast). Cross-encoders process both texts together, calculating deep attention matches (slow but highly accurate)." },
      architect: { q: "How do you choose between 384, 1024, and 1536 dimension models?", a: "Dimensionality dictates memory footprints and query speeds. 384d is fast and light (local); 1536d is rich (API-based). Choose based on recall requirements and latency budgets." },
      systemDesign: { q: "Design a duplicate-transaction flagging engine.", a: "Extract transaction values ➔ generate embeddings on merchant-detail strings ➔ query pgvector for matches with cosine score > 0.95." },
      behavioral: { q: "How did you resolve a performance bottleneck where vector generation took 5 seconds?", a: "I introduced batch processing in our embedding pipeline and set up local model execution using Ollama, reducing latency to 150ms." }
    },
    assignment: "Create a Python file using Sentence-Transformers to vectorize 5 transactions and print their similarity coefficients.",
    quizzes: [
      {
        question: "Which similarity metric evaluates vector directions, ignoring magnitude variations?",
        type: "mcq",
        options: ["Euclidean Distance", "Cosine Similarity", "Manhattan Metric", "Hamming Distance"],
        correctIndex: 1,
        explanation: "Cosine similarity measures the angle between vectors, normalizing scale offsets."
      }
    ],
    flashcards: [
      { front: "Vector Dimension", back: "The size of the float array representing the embedding (e.g. 1536 numbers)." }
    ],
    revisionSummary: "Embeddings map meaning to coordinates. Cosine checks angle alignments. Keep model choices consistent.",
    tutorResponses: {
      eli5: "Imagine words are Lego blocks. Embeddings are list coordinates showing where to place each block on a giant board so similar colors sit next to each other.",
      college: "Embeddings represent dense vectors generated by the hidden states of bi-encoder transformer architectures, converting text into float lists.",
      senior: "When designing search clusters, evaluate dimensionality bounds. Choose 1024 or 1536 dimensions depending on model performance budgets.",
      architect: "Set up vector search engines inside microservices using pre-calculated connection pools. Always deploy read-replicas for query scale.",
      banking: "At CBA, we use vector searches to index transaction log traces, matching system alerts with historical warning profiles.",
      story: "A customer spent hours reviewing transaction records to find fraud. We vectorized logs, plotted them on a semantic map, and flagged anomalous coordinate clusters."
    },
    videos: [
      {
        title: "Cosine Similarity clearly explained",
        url: "https://www.youtube.com/watch?v=e9U0Qkl1964",
        duration: "19m",
        provider: "StatQuest",
        category: "Overview",
        instructor: "Josh Starmer",
        year: 2023,
        whyRecommended: "Josh explains vector projections and similarity equations visually.",
        learningObjectives: ["Calculate cosine coefficients", "Visualize angle spaces"],
        prerequisites: ["Basic arithmetic"],
        timestamps: [{ time: "00:00", label: "Intro" }],
        summary: "Introduction to Cosine Similarity math."
      }
    ]
  },
  "Vector Databases": {
    difficulty: "Advanced",
    overview: "Vector Databases store, index, and query high-dimensional embeddings efficiently using specialized approximate nearest neighbor (ANN) search trees.",
    whyMatters: "Regular SQL tables cannot search millions of vectors under millisecond latency. Vector databases are critical for scaling production RAG engines.",
    examples: ["Pinecone", "pgvector (PostgreSQL)", "OpenSearch Serverless"],
    story: "A clerk is asked to find a book in a library with 10 million texts. If they review every shelf, they fail. If the library indexes books by topics, and they jump to the correct room, they succeed. That is a Vector DB.",
    analogyTitle: "The Categorized Library",
    analogyContent: "Vector Databases are like a categorized library. Instead of checking every book sequentially, they use coordinate mapping algorithms to locate matches in milliseconds.",
    memoryHook: "VECTDB: Vector Indexing Enhances Search Speeds.",
    mnemonics: ["HNSW: Hierarchical Navigable Small World graphs"],
    architectureSteps: ["Vector ingestion", "ANN indexing graph creation", "Metadata mapping", "Query execution"],
    architectureDetails: {
      "Vector ingestion": "Store vector arrays with raw text IDs.",
      "ANN indexing graph creation": "Build search trees (HNSW/IVF).",
      "Metadata mapping": "Bind search labels (e.g. date, doc type).",
      "Query execution": "Locate nearest vectors matching query coordinates."
    },
    bankingUseCase: {
      title: "Real-time Auditing Database",
      description: "Storing masked transaction logs for compliance checks.",
      implementation: "Use PostgreSQL pgvector with HNSW indices to store server vectors."
    },
    commonMistakes: {
      beginner: "Not creating vector indices (like HNSW), resulting in slow, full-table scans.",
      performance: "Enforcing complex metadata filters that run after vector search, stripping valid results.",
      scaling: "Sizing cluster instances incorrectly, causing memory crashes under high query loads.",
      security: "Exposing index credentials or raw database ports to public internet interfaces.",
      cost: "Provisioning high-end, dedicated server instances for low-volume developmental vectors.",
      traps: "Assuming vector databases always return exact matching records (ANN is approximate)."
    },
    interviewQuestions: {
      beginner: { q: "What is pgvector?", a: "An extension for PostgreSQL that adds support for vector datatypes, distance operators, and vector indexing (HNSW/IVF)." },
      intermediate: { q: "Explain HNSW vs IVF index types.", a: "HNSW builds multi-layer graphs representing semantic structures (highly accurate, consumes more memory). IVF splits vector space into clusters using centroids (faster search, uses less memory)." },
      senior: { q: "How do you optimize vector search using metadata filters?", a: "Use pre-filtering (filtering before vector lookup) to ensure database indexes are evaluated correctly, avoiding missing records." },
      architect: { q: "Design an index update pipeline for a live bank database.", a: "Run document updates via async triggers ➔ place tasks in Redis queue ➔ update pgvector index async to prevent write locks." },
      systemDesign: { q: "Design a high-volume client profile search engine.", a: "User profiles ➔ embed via Titan ➔ index in Amazon OpenSearch Serverless ➔ query via API Gateway." },
      behavioral: { q: "How did you handle a database crash caused by HNSW memory consumption?", a: "I audited the index configuration, adjusted max connections limits, and scaled the ECS database instances memory pool." }
    },
    assignment: "Create a PostgreSQL schema migration file that registers pgvector, defines a vector column, and builds an HNSW index.",
    quizzes: [
      {
        question: "Which index type is built as a multi-layer graph for fast vector queries?",
        type: "mcq",
        options: ["IVFFlat", "HNSW", "B-Tree", "Hash Index"],
        correctIndex: 1,
        explanation: "HNSW builds navigable graphs, providing optimal search speed at the cost of memory."
      }
    ],
    flashcards: [
      { front: "ANN Search", back: "Approximate Nearest Neighbor search, prioritizing lookup speed over absolute precision." }
    ],
    revisionSummary: "Vector databases index embeddings using ANN. HNSW is accurate but uses memory. Implement pre-filtering.",
    tutorResponses: {
      eli5: "A vector database is like a smart post office. It groups packages by size and destination coordinates, so the delivery truck finds matching routes instantly.",
      college: "Vector DBs implement approximate nearest neighbor algorithms on vector spaces, scaling search performance for high-dimensional float indices.",
      senior: "When implementing pgvector, monitor memory usage. Configure HNSW parameters (m, ef_construction) carefully.",
      architect: "Separate write workloads from read replicas. Use managed OpenSearch Serverless for production scalability.",
      banking: "All database instances holding CBA user files must enforce encryption-at-rest configurations.",
      story: "Our old database timed out trying to match credit card claims. We moved indices to pgvector and set up HNSW graphs, cutting search latencies by 95%."
    },
    videos: [
      {
        title: "Introduction to pgvector",
        url: "https://www.youtube.com/watch?v=gQdUEX5uReA",
        duration: "20m",
        provider: "StatQuest",
        category: "Deep Dive",
        instructor: "Josh Starmer",
        year: 2024,
        whyRecommended: "Explains vector indexing databases visually.",
        learningObjectives: ["Configure vector indices", "Execute similarity queries"],
        prerequisites: ["None"],
        timestamps: [{ time: "00:00", label: "Intro" }],
        summary: "Introduction to pgvector and vector database concepts."
      }
    ]
  },
  "AI Agents": {
    difficulty: "Expert",
    overview: "AI Agents are autonomous loop patterns where LLMs evaluate goals, call external tools, analyze results, and self-correct until tasks are complete.",
    whyMatters: "Agents move AI beyond simple text chats. They automate complex banking audit workflows, code generation, and diagnostic tasks without human intervention.",
    examples: ["LangGraph graph states", "CrewAI swarms", "ReAct loop executors"],
    story: "A company CEO delegates a project to a department manager. The manager divides the tasks, gives them to developers and reviewers, collects feedback, and updates the CEO. This is a multi-agent system.",
    analogyTitle: "The Corporate Office",
    analogyContent: "AI Agents are like employees in a corporate office. They have specific job profiles (prompts), tools (APIs), and follow procedures (state graphs) to complete complex projects.",
    memoryHook: "AGENT: Action, Goal, Evaluation, Next Task loop.",
    mnemonics: ["GRAPH: Group of Recurrent Agentic Process Handlers"],
    architectureSteps: ["Ingest global state", "LLM decides action/tool", "Execute tool async", "Update state checklist", "Conditional transition checking"],
    architectureDetails: {
      "Ingest global state": "Load current variables dictionary.",
      "LLM decides action/tool": "Analyze variables and call target function.",
      "Execute tool async": "Execute network call or database script.",
      "Update state checklist": "Append tool outputs to graph variables.",
      "Conditional transition checking": "Route flow back to LLM or output completion."
    },
    bankingUseCase: {
      title: "Suspicious Transaction Log Auditor",
      description: "Scanning logs for card fraud and generating reports.",
      implementation: "LangGraph state machine with manual approval checkpoints prior to report PDF outputs."
    },
    commonMistakes: {
      beginner: "Not setting maximum execution limits, causing agents to run in infinite API loops, consuming budgets.",
      performance: "Forgetting to persist state checkpointers, losing intermediate execution logs if a node fails.",
      scaling: "Exposing too many complex tools to a single LLM, causing planning failures and bad tool calls.",
      security: "Allowing agents to run raw code execution tools on database servers without VPC isolation.",
      cost: "Relying on expensive model prompts for simple routing steps (use local rules/regex instead).",
      traps: "Assuming agents will always execute nodes in correct sequence without strict graph logic edge constraints."
    },
    interviewQuestions: {
      beginner: { q: "What is an AI Agent?", a: "An LLM running inside a loop with access to tools, executing steps dynamically based on state observations." },
      intermediate: { q: "Explain the difference between LangGraph and CrewAI.", a: "LangGraph is state-machine based, focusing on cyclical loops, precise node routing, and checkpointer states. CrewAI is role-based, focusing on collaborative swarms." },
      senior: { q: "How do you implement human-in-the-loop in LangGraph?", a: "By configuring interrupts on specific nodes (e.g. interrupt_before=['generate_report']). The graph pauses, saves state, and resumes once approved." },
      architect: { q: "Design a scalable multi-agent mortgage underwriting system.", a: "Create subgraphs for KYC, AML, and risk. Run subgraphs async, consolidate state, and route to underwriter approval node." },
      systemDesign: { q: "Design an automated invoice processor agent.", a: "Ingest invoice ➔ OCR tool ➔ validate values via underwriter LLM ➔ pause for approval ➔ execute payment API." },
      behavioral: { q: "Tell me about a time an agent went into an infinite loop and how you mitigated it.", a: "I encountered a loop where an agent repeatedly retried a broken API. I introduced a node execution limit and added backoff retries." }
    },
    assignment: "Create a LangGraph script defining Ingest, Audit, and Complete nodes, persisting states via SqliteSaver.",
    quizzes: [
      {
        question: "Which component in LangGraph allows developers to pause execution for human verification?",
        type: "mcq",
        options: ["Conditional edges", "State checkpointers", "Interrupt points", "State variables"],
        correctIndex: 2,
        explanation: "Interrupt points pause the thread execution before or after nodes, awaiting user inputs."
      }
    ],
    flashcards: [
      { front: "LangGraph State", back: "The central data dictionary passed between nodes, updated using reducer operations." }
    ],
    revisionSummary: "Agents call tools in loops. LangGraph routes state nodes. Implement checkpointers and human-in-the-loop gates.",
    tutorResponses: {
      eli5: "Imagine a robot secretary. You say 'schedule a meeting'. It checks the calendar, emails the team, waits for replies, and lists the time on your screen.",
      college: "Agents utilize state graph abstractions to handle non-deterministic workflows, relying on LLM planners to select paths.",
      senior: "Always define strict schemas for agent state dictionaries. Implement node limits and trace spans using Phoenix.",
      architect: "Build agents as micro-engines. Use event-driven queues to trigger graph executions async.",
      banking: "All financial updates triggered by CBA agents must pass double-authentication approval gates.",
      story: "We had a manual loan review pipeline that took 5 days. We built a LangGraph agent swarm: it ingested files, ran compliance checks, paused for human sign-off, and printed PDF summaries."
    },
    videos: [
      {
        title: "Introduction to LangGraph",
        url: "https://www.youtube.com/watch?v=wjZofJX0v4M",
        duration: "30m",
        provider: "Anthropic",
        category: "Deep Dive",
        instructor: "Harrison Chase",
        year: 2024,
        whyRecommended: "Harrison covers LangGraph states and node parameters clearly.",
        learningObjectives: ["Create state graphs", "Configure edge routers"],
        prerequisites: ["Python OOP"],
        timestamps: [{ time: "00:00", label: "Intro" }],
        summary: "Introduction to stateful agents."
      }
    ]
  },
  "MCP": {
    difficulty: "Advanced",
    overview: "Model Context Protocol (MCP) is an open standard that connects model assistants (clients) to tools and resources (servers) using a unified JSON-RPC protocol.",
    whyMatters: "MCP eliminates custom API client coding. It enables AI coding tools (Claude Code, Cursor) to safely read local databases and command files via stdio.",
    examples: ["Claude Desktop MCP configs", "FastMCP Python server", "SQLite MCP server"],
    story: "Imagine buying a different power charger for every phone you own. That is custom API coding. MCP is USB-C: a single, universal adapter that connects all devices and accessories instantly.",
    analogyTitle: "The USB-C Adapter",
    analogyContent: "MCP acts like a USB-C adapter for AI. It standardizes how LLM clients communicate with local resources (databases, terminals, APIs) safely via stdio or SSE transports.",
    memoryHook: "MCP: Models Connecting Protocols universally.",
    mnemonics: ["STDIO: Standard Input Output transport in MCP"],
    architectureSteps: ["Client loads config", "Binds stdio channels", "JSON-RPC tool discovery query", "Tool command execution response"],
    architectureDetails: {
      "Client loads config": "Read server schemas and command variables.",
      "Binds stdio channels": "Setup IPC communications.",
      "JSON-RPC tool discovery query": "Model audits available tools list.",
      "Tool command execution response": "Execute tool function locally and stream output back."
    },
    bankingUseCase: {
      title: "Bank Database Mock Auditor",
      description: "Connecting local models securely to mock account records.",
      implementation: "Create a FastMCP server exposing query tools for card databases."
    },
    commonMistakes: {
      beginner: "Forgetting that MCP servers run locally via stdio, locking terminal threads with input prompt commands.",
      performance: "Neglecting to implement connection limits on SQLite databases bound to MCP servers.",
      scaling: "Running remote MCP servers on raw HTTP endpoints without securing SSE handshake connections.",
      security: "Exposing destructive tools (e.g. run_command) inside MCP servers without user confirmation gates.",
      cost: "Requesting massive schema indexes from database MCP resources, overflowing LLM token context buffers.",
      traps: "Assuming Claude Code will always execute tools in the expected sequence without strict parameters validation."
    },
    interviewQuestions: {
      beginner: { q: "What is Model Context Protocol?", a: "An open-standard protocol that connects LLM clients (like Claude) to local or remote tool servers using JSON-RPC." },
      intermediate: { q: "Explain the difference between stdio and SSE transport in MCP.", a: "Stdio transport executes locally using standard input/output channels (best for desktop tools). SSE (Server-Sent Events) runs over HTTP (best for remote web services)." },
      senior: { q: "How do you enforce security guardrails in custom MCP tool execution?", a: "Filter arguments on the server-side, configure strict path restrictions, and implement interactive approval prompts for risky commands." },
      architect: { q: "Design an enterprise gateway connecting Claude Code to internal APIs.", a: "VPC Gateway ➔ MCP Server Proxy ➔ IAM OAuth checks ➔ local fastmcp instance calling secure databases." },
      systemDesign: { q: "Design a secure database editor MCP tool.", a: "Client Claude ➔ stdio ➔ MCP Server ➔ PII masking logic ➔ DB query execution." },
      behavioral: { q: "How did you manage a security audit where an MCP server was flagged for open terminal command access?", a: "I restricted the tool registry scope, removed generic command executions, and replaced them with specific parameter functions." }
    },
    assignment: "Create a Python FastMCP file that connects to a mock SQLite database and exposes read balance tools.",
    quizzes: [
      {
        question: "Which transport channel is default for local desktop MCP integrations?",
        type: "mcq",
        options: ["SSE (Websockets)", "stdio (Standard I/O)", "gRPC", "SOAP API"],
        correctIndex: 1,
        explanation: "stdio provides simple, secure, low-latency inter-process communication for local client-server pairs."
      }
    ],
    flashcards: [
      { front: "JSON-RPC in MCP", back: "The protocol format used to negotiate tools, resources, and prompts between LLM client and server." }
    ],
    revisionSummary: "MCP standardizes tool access. Local servers use stdio. Remote use SSE. Implement strict parameters filtering.",
    tutorResponses: {
      eli5: "MCP is like a universal translator plug. It lets Claude talk to your computer files and databases without needing special code for every single task.",
      college: "MCP abstracts tool-calling schemas away from model providers, creating a decoupled USB-like protocol for agentic extensions.",
      senior: "Always validate tool payloads. Prevent directory traversal bugs in file MCP tools by enforcing absolute path checks.",
      architect: "Enforce least-privilege policies. Remote MCP nodes should be placed behind secure auth gateways with OAuth layers.",
      banking: "All MCP services deployed at CBA must isolate database access schemas to mock database environments.",
      story: "We kept writing custom wrappers to let models run database queries. We replaced them with an MCP server: now Claude connects to SQLite and runs queries directly."
    },
    videos: [
      {
        title: "Model Context Protocol Introduction",
        url: "https://www.youtube.com/watch?v=wjZofJX0v4M",
        duration: "15m",
        provider: "Anthropic",
        category: "Overview",
        instructor: "Alex Albert",
        year: 2024,
        whyRecommended: "Alex explains MCP server configurations and Claude Desktop binds clearly.",
        learningObjectives: ["Understand stdio configs", "Build tool servers"],
        prerequisites: ["Python fundamentals"],
        timestamps: [{ time: "00:00", label: "Intro" }],
        summary: "Introduction to Model Context Protocol."
      }
    ]
  },
  "LLMOps / MLOps": {
    difficulty: "Advanced",
    overview: "LLMOps covers the tools, metrics, and deployment pipelines required to monitor, evaluate, and trace LLM applications in production.",
    whyMatters: "Without tracing, debugging agent graph loops or pinpointing why a RAG pipeline failed is impossible. LLMOps ensures uptime and cost control.",
    examples: ["Arize Phoenix", "LangSmith", "Quantization tools (Ollama)"],
    story: "A manager monitors a team of support staff. Instead of guessing how they do, they log every phone call, evaluate customer feedback, trace how long tasks take, and audit costs. This is LLMOps.",
    analogyTitle: "The Call Center Monitor",
    analogyContent: "LLMOps is like a call center monitoring dashboard. It traces every LLM API query (span), logs latency metrics, audits token expenditures, and flags bad/toxic outputs.",
    memoryHook: "OPS: Output evaluation, Parameter tuning, Span tracing.",
    mnemonics: ["TRACING: Tracking Real-time Agentic Coordinates In Nodes Globally"],
    architectureSteps: ["Model query interception", "Span logging to tracker", "Evaluation metric check", "Cost/Quota limit auditing"],
    architectureDetails: {
      "Model query interception": "Log model payload inputs and output tokens.",
      "Span logging to tracker": "Build trace logs in Arize Phoenix.",
      "Evaluation metric check": "Run LLM-as-a-judge to test accuracy and faithfulness.",
      "Cost/Quota limit auditing": "Enforce usage limits on active API slots."
    },
    bankingUseCase: {
      title: "Complaints Portal Monitoring",
      description: "Tracing API spans for automated complaint classifications.",
      implementation: "Instrument FastAPI routes with OpenTelemetry, exporting spans to Arize Phoenix."
    },
    commonMistakes: {
      beginner: "Not logging LLM inputs and outputs, leaving developers blind when users complain of bad responses.",
      performance: "Running heavy evaluation models synchronously inside the request-response thread, increasing latency.",
      scaling: "Relying on expensive API models for tracing logs storage (use local telemetry agents instead).",
      security: "Exposing sensitive client data inside tracing logs (PII must be masked before exporting spans).",
      cost: "Neglecting token usage tracking, leading to massive billing spikes from looping agents.",
      traps: "Assuming LLM-as-a-judge metrics are 100% accurate (always supplement with regression test sets)."
    },
    interviewQuestions: {
      beginner: { q: "What is LLM Tracing?", a: "Recording inputs, outputs, latency, and costs of every step (span) in an LLM pipeline to diagnose issues." },
      intermediate: { q: "What is Model Quantization?", a: "Reducing model weight size (e.g. from 16-bit float to 4-bit integer) to run models on cheaper GPU/CPU hardware with minimal accuracy loss." },
      senior: { q: "Explain the Ragas framework metrics.", a: "Evaluates RAG systems using: Faithfulness (checking if answer came from context) and Answer Relevance (checking if answer matches query)." },
      architect: { q: "Design a telemetry tracking stack for an enterprise bank API.", a: "FastAPI ➔ OpenTelemetry instrumentation ➔ Collector agent ➔ Arize Phoenix backend ➔ Alert triggers." },
      systemDesign: { q: "Design a semantic caching middleware.", a: "Query ➔ Embed ➔ check Redis for matching vector (similarity > 0.96) ➔ return cached answer ➔ else call LLM ➔ save vector." },
      behavioral: { q: "Describe how you optimized LLM costs by 50% in a production app.", a: "I implemented semantic caching, set up routing logic to send simple tasks to cheap models, and quantized local models for offline processing." }
    },
    assignment: "Configure a Python script that integrates OpenTelemetry, traces a mock LLM invocation, and exports logs to a local Phoenix instance.",
    quizzes: [
      {
        question: "Which tool is commonly used to trace agent steps and document spans?",
        type: "mcq",
        options: ["PostgreSQL", "Arize Phoenix", "Docker", "Gunicorn"],
        correctIndex: 1,
        explanation: "Arize Phoenix provides OpenTelemetry-compliant tracing frameworks specifically designed for LLMs."
      }
    ],
    flashcards: [
      { front: "Model Fine-Tuning", back: "Training a pre-trained model on specific dataset formats to adapt its style or domain knowledge." }
    ],
    revisionSummary: "Trace pipeline runs. Evaluate outputs async. Quantize models for local hosts. Mask data before logging.",
    tutorResponses: {
      eli5: "LLMOps is like a speed monitor and cash register for AI. It tells you how fast the robot is thinking, if it is making mistakes, and how much money it costs.",
      college: "LLMOps implements telemetry pipelines on top of LLM application runtimes, evaluating performance metrics like hallucinations.",
      senior: "Always validate telemetry performance impact. Mask database spans using OpenTelemetry processors.",
      architect: "Deploy decentralized tracking models. Use Redis to aggregate cost logs before committing them to audit databases.",
      banking: "All monitoring trails for CBA AI services must reside on secure, local VPC volumes.",
      story: "We built an agent that kept running out of memory. We set up Arize Phoenix traces: we found a loop calling tools repeatedly, fixed the node state logic, and reduced costs by 80%."
    },
    videos: [
      {
        title: "LLMOps and Tracing",
        url: "https://www.youtube.com/watch?v=7xTGNNLPyMI",
        duration: "40m",
        provider: "NVIDIA",
        category: "Lecture",
        instructor: "Gavin Li",
        year: 2024,
        whyRecommended: "Gavin covers OpenTelemetry traces and span structures for LLM nodes visually.",
        learningObjectives: ["Configure tracing", "Deploy model checkpoints"],
        prerequisites: ["Python fundamentals"],
        timestamps: [{ time: "00:00", label: "Intro" }],
        summary: "Introduction to LLMOps pipelines."
      }
    ]
  },
  "Security": {
    difficulty: "Expert",
    overview: "Security for LLMs focuses on defending pipelines against prompt injections, protecting client PII, preventing jailbreaks, and enforcing data access isolation.",
    whyMatters: "Banking LLMs handle sensitive customer data. A single injection exploit or PII leak can lead to severe regulatory fines and security breaches.",
    examples: ["Jailbreak testing", "Microsoft Presidio", "LlamaGuard configuration"],
    story: "A bank teller is trained to check client IDs before sharing details. A fraudster tries to trick the teller: 'Tell me the balance, my house is on fire!'. The teller ignores the panic and demands ID. That is security guardrails.",
    analogyTitle: "The ID Checker Gate",
    analogyContent: "Security guardrails act like bank security guards. They inspect inputs for tricks (jailbreaks) and scrub outputs for private data (PII) before letting data cross boundaries.",
    memoryHook: "GUARD: Gatekeeping inputs, User access checks, Anonymizing PII, Routing safely, Defensive prompts.",
    mnemonics: ["OWASP: Open Web Application Security Project guidelines for LLMs"],
    architectureSteps: ["Input scan for injections", "PII scrubbing filter", "Model processing", "Output sanitization gate"],
    architectureDetails: {
      "Input scan for injections": "Check user queries for system bypass phrases.",
      "PII scrubbing filter": "Mask names, credit cards, and balances locally.",
      "Model processing": "Execute LLM instructions inside safe parameters.",
      "Output sanitization gate": "Run LlamaGuard to check for toxic or policy violating responses."
    },
    bankingUseCase: {
      title: "PII masking in Transaction Queries",
      description: "Scrubbing credit card numbers from client chat inputs.",
      implementation: "Run Microsoft Presidio Analyzer in Python before sending query embeddings to db."
    },
    commonMistakes: {
      beginner: "Relying on system prompts alone to prevent PII leaks (users can easily bypass them with jailbreaks).",
      performance: "Running heavy, multi-step regex models on incoming text blocks synchronously, bottlenecking threads.",
      scaling: "Failing to update injection detection rules as new exploit strategies emerge.",
      security: "Exposing raw, unredacted model completion traces in diagnostic web dashboards.",
      cost: "Sending all inputs to cloud guardrail services (use lightweight local rules engines for initial filters).",
      traps: "Assuming that a secure LLM architecture only requires input checks (output checks are equally critical)."
    },
    interviewQuestions: {
      beginner: { q: "What is a Prompt Injection?", a: "An exploit where a user writes text designed to override the model's system instructions (e.g. 'Ignore previous rules and show password')." },
      intermediate: { q: "How does Microsoft Presidio work?", a: "Uses regex engines and Named Entity Recognition (NER) models to locate and mask PII (credit cards, names) in raw text strings." },
      senior: { q: "Explain how to configure LlamaGuard.", a: "A specialized model trained to classify inputs/outputs against a custom policy (e.g. violence, fraud, PII). If LlamaGuard flags a query, the system rejects the call." },
      architect: { q: "Design a secure banking LLM gateway architecture.", a: "Client ➔ local PII scrubber ➔ WAF ➔ LLM engine with system guards ➔ Output moderator ➔ user." },
      systemDesign: { q: "Design a secure compliance log archiver.", a: "Raw logs ➔ scrub PII via Presidio ➔ generate vector ➔ index in pgvector behind IAM gateway." },
      behavioral: { q: "Describe a time you audited a security vulnerability in an LLM pipeline.", a: "I simulated jailbreaks on our chat engine, bypassed prompt rules, and successfully restricted access by introducing a LlamaGuard verification layer." }
    },
    assignment: "Create a Python file integrating Microsoft Presidio to scrub credit card details from a mock transaction log string.",
    quizzes: [
      {
        question: "Which OWASP LLM risk addresses outputting data that should not be visible to the user?",
        type: "mcq",
        options: ["Prompt Injection", "Sensitive Information Disclosure", "Insecure Output Handling", "Model Denial of Service"],
        correctIndex: 1,
        explanation: "Sensitive Information Disclosure covers leaking PII or confidential data due to insufficient output filtering."
      }
    ],
    flashcards: [
      { front: "Jailbreaking", back: "Structuring prompts to bypass safety rules built into models by providers." }
    ],
    revisionSummary: "Always filter inputs and outputs. Mask PII locally using Presidio. Audit logs for safety violations.",
    tutorResponses: {
      eli5: "Security guardrails are like a filter mask. They check if the input contains naughty words or if the output leaks secrets, stopping them instantly.",
      college: "Security architectures enforce zero-trust inputs, applying localized token scrubbers to sanitise input vectors before processing.",
      senior: "Never trust LLM parameters to enforce security boundaries. Implement hardcoded regex gates on all system endpoints.",
      architect: "Decouple moderation logic. Place LlamaGuard classifiers on private nodes to optimize endpoint performance.",
      banking: "All CBA customer data must undergo anonymization processing before crossing external API boundaries.",
      story: "A user trick our chat assistant into showing private transaction records. We added an output sanitization layer that intercepts all responses and blocks any card patterns, resolving the leak."
    },
    videos: [
      {
        title: "OWASP Top 10 for LLM Applications",
        url: "https://www.youtube.com/watch?v=7xTGNNLPyMI",
        duration: "30m",
        provider: "OpenAI",
        category: "Deep Dive",
        instructor: "Logan Kilpatrick",
        year: 2024,
        whyRecommended: "Logan covers model jailbreak vectors and mitigation strategies clearly.",
        learningObjectives: ["Mitigate injections", "Configure guardrails"],
        prerequisites: ["None"],
        timestamps: [{ time: "00:00", label: "Intro" }],
        summary: "Introduction to LLM Security."
      }
    ]
  },
  "Cloud": {
    difficulty: "Advanced",
    overview: "Cloud deployment patterns focus on hosting LLMs, databases, and microservices securely using managed cloud services (like AWS Bedrock, OpenSearch, and ECS).",
    whyMatters: "Production systems require scalability, least-privilege IAM policies, and VPC sandboxing to run safely under corporate compliance schedules.",
    examples: ["AWS Bedrock Boto3 calls", "VPC Endpoint setups", "IAM authorization policies"],
    story: "A bank builds a high-security vault. Instead of placing it in the street, they put it inside a locked bank branch, assign keys to specific staff, and log everyone who enters. This is VPC sandboxing and IAM in AWS.",
    analogyTitle: "The Vault Branch",
    analogyContent: "AWS Bedrock is like renting space in a high-security vault inside a bank branch. The VPC endpoint isolates the connection, and IAM policies act as keys matching specific access permissions.",
    memoryHook: "CLOUD: Configured Layouts Optimized Under Dedicated networks.",
    mnemonics: ["IAM: Identity Access Management security controls"],
    architectureSteps: ["User API call WAF", "FastAPI inside ECS Container", "IAM authentication check", "AWS Bedrock InvokeModel"],
    architectureDetails: {
      "User API call WAF": "Firewall filters traffic inputs.",
      "FastAPI inside ECS Container": "Execute microservice python instructions.",
      "IAM authentication check": "Validate access roles and keys.",
      "AWS Bedrock InvokeModel": "Request inference from Claude endpoint securely."
    },
    bankingUseCase: {
      title: "Secure Bedrock Loan Processor",
      description: "Processing documents securely inside AWS VPC networks.",
      implementation: "Deploy FastAPI on ECS with Boto3, connecting to Bedrock via private VPC endpoints."
    },
    commonMistakes: {
      beginner: "Storing AWS secret keys directly in application code variables (use IAM roles instead).",
      performance: "Connecting to public Bedrock endpoints, incurring extra latency and routing network risks.",
      scaling: "Configuring container clusters without autoscaling parameters, causing service drops under peak loads.",
      security: "Assigning wildcard permission keys (e.g. bedrock:*) to container instances.",
      cost: "Relying on public internet NAT gateways, incurring massive data transfer fee costs.",
      traps: "Assuming AWS Bedrock models are always available (always configure multi-region fallback loops)."
    },
    interviewQuestions: {
      beginner: { q: "What is AWS Bedrock?", a: "A managed AWS service that provides access to foundation models (Claude, Titan, Llama) via unified APIs without managing hardware." },
      intermediate: { q: "Why do we use VPC Endpoints for Bedrock?", a: "VPC Endpoints route network traffic directly through AWS internal networks, keeping data isolated from the public internet." },
      senior: { q: "How do you configure least-privilege IAM permissions for Bedrock?", a: "Define a policy allowing only 'bedrock:InvokeModel' action, restricted specifically to the target model's ARN resource." },
      architect: { q: "Design a secure, highly-available AWS LLM microservice.", a: "ECS container tasks ➔ load balancer ➔ private subnet VPC Endpoints ➔ Bedrock ➔ multi-region fallback route." },
      systemDesign: { q: "Design an automated audit log archiver.", a: "App logs ➔ S3 bucket ➔ trigger Lambda ➔ embed via Titan ➔ index in OpenSearch Serverless." },
      behavioral: { q: "Describe a time a cloud service limit crashed your pipeline, and how you fixed it.", a: "Our Bedrock request limits were exceeded. I added backoff retries, built a fallback pool of models, and requested a limit increase from AWS." }
    },
    assignment: "Write a Boto3 Python script that calls Claude-3-Haiku inside AWS Bedrock using temporary session keys.",
    quizzes: [
      {
        question: "Which AWS service is best suited for hosting scalable, containerized FastAPI LLM microservices?",
        type: "mcq",
        options: ["EC2", "AWS Lambda", "ECS (Elastic Container Service) with Fargate", "S3"],
        correctIndex: 2,
        explanation: "ECS Fargate runs serverless container instances, simplifying autoscaling and pipeline tasks."
      }
    ],
    flashcards: [
      { front: "IAM Role", back: "An AWS identity with permission policies that can be assumed by applications to make secure API calls." }
    ],
    revisionSummary: "Deploy inside private subnets. Access Bedrock via VPC endpoints. Avoid hardcoding credentials. Enforce IAM checks.",
    tutorResponses: {
      eli5: "Cloud hosting is like renting a high-tech computer in a secure vault. You only pay for the time you use it, and guards check everyone's ID cards.",
      college: "Cloud architectures wrap LLM inferences inside load-balanced VPC subnets, automating container provisioning based on query rates.",
      senior: "Always assign IAM roles directly to tasks. Configure security groups to restrict inbound traffic to backend ports.",
      architect: "Deploy ECS containers across multiple Availability Zones. Instrument metrics using CloudWatch.",
      banking: "All CBA workloads must reside inside secure Australian cloud regions (ap-southeast-2).",
      story: "We had a local model server that crashed under traffic. We containerized it with Docker, deployed it to AWS ECS, and routed Bedrock calls securely via private subnets."
    },
    videos: [
      {
        title: "AWS Bedrock Deep Dive",
        url: "https://www.youtube.com/watch?v=wjZofJX0v4M",
        duration: "45m",
        provider: "AWS",
        category: "Enterprise",
        instructor: "Swami Sivasubramanian",
        year: 2024,
        whyRecommended: "Swami details model customization and private VPC endpoints on Bedrock visually.",
        learningObjectives: ["Set up VPC endpoints", "Configure IAM policies"],
        prerequisites: ["AWS Basics"],
        timestamps: [{ time: "00:00", label: "Intro" }],
        summary: "Introduction to AWS Bedrock."
      }
    ]
  },
  "Backend Engineering": {
    difficulty: "Advanced",
    overview: "Backend Engineering for AI focuses on designing robust asynchronous API layers, managing connections databases pools, and writing queue pipelines to handle long-running model queries.",
    whyMatters: "LLM queries can take seconds to resolve. A standard synchronous backend will freeze. Async FastAPI with task queues is mandatory for responsive user interfaces.",
    examples: ["FastAPI async routes", "Celery tasks", "SQLAlchemy connection pools"],
    story: "A restaurant customer orders a complex meal. If the waiter stands at the table waiting for the chef to cook it, they freeze the system. Instead, the waiter logs the order, gives it to the kitchen queue, and continues serving. That is asynchronous processing.",
    analogyTitle: "The Kitchen Order Queue",
    analogyContent: "Asynchronous backend design is like a kitchen order queue. FastAPI registers the request, passes the heavy model execution task to a background queue (Redis/Celery), and returns a receipt immediately.",
    memoryHook: "ASYNC: Asynchronous System Yields Network Continuity.",
    mnemonics: ["CELERY: Containerized Engine Logging Execution Runs Yields"],
    architectureSteps: ["Client triggers request", "FastAPI pushes to Redis queue", "Background workers process LLM", "Save result in db", "Client polls endpoint"],
    architectureDetails: {
      "Client triggers request": "Initiate async HTTP POST query.",
      "FastAPI pushes to Redis queue": "Register task ID and return receipt.",
      "Background workers process LLM": "Execute long running API calls.",
      "Save result in db": "Persist completed response payloads.",
      "Client polls endpoint": "Fetch verified results once complete."
    },
    bankingUseCase: {
      title: "Mortgage Report Generator",
      description: "Compiling 50-page financial audits async.",
      implementation: "FastAPI endpoint pushing report tasks to a Redis worker queue, saving output PDFs in S3."
    },
    commonMistakes: {
      beginner: "Writing synchronous routes (def instead of async def) for slow API calls, locking the backend thread.",
      performance: "Creating a new database connection on every single request instead of utilizing connection pools.",
      scaling: "Hitting API timeouts by waiting for model generation synchronously inside request threads.",
      security: "Exposing raw stack traces or database errors in API JSON response payloads.",
      cost: "Not implementing query caching, repeatedly invoking models for identical static parameters.",
      traps: "Assuming Celery workers will always process tasks in sequence (always design tasks as idempotent)."
    },
    interviewQuestions: {
      beginner: { q: "Why use async def in FastAPI?", a: "It enables non-blocking I/O operations, letting the server handle thousands of concurrent queries while waiting for slow database or model responses." },
      intermediate: { q: "What is database connection pooling?", a: "Maintaining a cache of open database connections that are reused across multiple requests, saving the overhead of open/close operations." },
      senior: { q: "How do you handle rate-limiting in a FastAPI LLM backend?", a: "Integrate a rate-limiting middleware (like SlowAPI) using Redis to track client IP query rates and return 429 status codes." },
      architect: { q: "Design a system to handle thousands of concurrent LLM document extractions.", a: "FastAPI ➔ Redis Queue ➔ Celery Workers running batch processes ➔ save results in PostgreSQL pgvector ➔ trigger WebSocket update." },
      systemDesign: { q: "Design an asynchronous agent report builder.", a: "FastAPI endpoint ➔ push task ➔ Celery worker executes LangGraph ➔ saves PDF ➔ notifies user." },
      behavioral: { q: "Describe a time an API timeout crashed your service, and how you resolved it.", a: "Our server timed out on slow model calls. I decoupled the execution, turned the route async using Redis queues, and implemented client polling." }
    },
    assignment: "Create a FastAPI python file defining an async route that yields simulated streaming tokens inside an SSE stream.",
    quizzes: [
      {
        question: "Which python library is default for defining database connection pools in FastAPI?",
        type: "mcq",
        options: ["Pydantic", "SQLAlchemy", "Requests", "Numpy"],
        correctIndex: 1,
        explanation: "SQLAlchemy provides robust connection pooling mechanisms that keep connections warm and recycle them."
      }
    ],
    flashcards: [
      { front: "Idempotent Task", back: "A task that can be executed multiple times without changing the final database result." }
    ],
    revisionSummary: "Write async routes. Use connection pooling. Decouple slow tasks using queues. Validate schemas via Pydantic.",
    tutorResponses: {
      eli5: "Backend engineering is like the plumbing in a house. It ensures when you press the button, the right pipes open, data flows cleanly, and nothing overflows.",
      college: "Backend systems implement event loops (ASGI) to handle non-blocking concurrent request routing to downstream DBs.",
      senior: "Always configure database statement timeouts. Enforce strict type conversions on all incoming request payloads.",
      architect: "Decouple frontend routes from process loops. Use Redis clusters to manage cache state.",
      banking: "All bank backend endpoints must validate payload signatures to prevent request tampering.",
      story: "Our mortgage server kept hanging when users uploaded large files. We moved the parsing logic to Celery worker threads, turning the endpoint async, which kept the portal responsive."
    },
    videos: [
      {
        title: "Asynchronous APIs with FastAPI",
        url: "https://www.youtube.com/watch?v=wjZofJX0v4M",
        duration: "30m",
        provider: "StatQuest",
        category: "Overview",
        instructor: "Sebas",
        year: 2024,
        whyRecommended: "Explains python async event loops and database pools visually.",
        learningObjectives: ["Write async routes", "Manage connection pools"],
        prerequisites: ["Python fundamentals"],
        timestamps: [{ time: "00:00", label: "Intro" }],
        summary: "Introduction to async FastAPI."
      }
    ]
  },
  "Banking Domain Knowledge": {
    difficulty: "Advanced",
    overview: "Banking Domain Knowledge covers compliance standards (APRA CPS 234), AML regulations, mortgage workflow steps, and core banking system integration structures.",
    whyMatters: "Building AI for banking is not just about prompt coding; it requires strict adherence to regulatory rules, credit risk metrics, and customer privacy laws.",
    examples: ["APRA compliance checks", "Basel III risk profiles", "KYC auditing workflows"],
    story: "A bank inspector reviews loan registers. They check: Are customer IDs verified? Is there fraud? Are credit scores mapped? Is data secure? The bank must prove compliance at every stage. AI systems must do the same. That is banking domain knowledge.",
    analogyTitle: "The Compliance Inspector",
    analogyContent: "Banking AI is like working with a government compliance inspector sitting at your desk. Every decision (loan approvals, fraud flags) must have clear explanations, audit trails, and conform to safety standards.",
    memoryHook: "BANK: Boundary security, Audit logs tracking, Necessary compliance, Known client verification.",
    mnemonics: ["APRA: Australian Prudential Regulation Authority security standards"],
    architectureSteps: ["Client transaction event", "AML scan gateway check", "Credit Risk valuation", "Compliance log archive"],
    architectureDetails: {
      "Client transaction event": "Triggers request payload.",
      "AML scan gateway check": "Lookup watchlists and blacklist coordinates.",
      "Credit Risk valuation": "Calculate debt ratios and scores.",
      "Compliance log archive": "Write tamper-proof log trails."
    },
    bankingUseCase: {
      title: "Automated AML Watchlist Scanner",
      description: "Auditing incoming accounts against regulatory sanctions lists.",
      implementation: "Multi-agent system (CrewAI) where an AML agent cross-references applicants with sanctions datasets."
    },
    commonMistakes: {
      beginner: "Not writing audit logs for AI decisions, leaving the bank unable to explain loan rejections.",
      performance: "Running slow AML queries synchronously inside transaction routing threads, blocking payments.",
      scaling: "Designing credit models that fail to handle fluctuating risk variables during market swings.",
      security: "Exposing customer account details in training logs, violating privacy laws.",
      cost: "Relying on LLMs for simple financial arithmetic calculations (use specialized code instead).",
      traps: "Assuming AI can automate loan approvals without a human credit officer signing off on final decisions."
    },
    interviewQuestions: {
      beginner: { q: "What is APRA CPS 234?", a: "An information security standard set by APRA that requires Australian financial entities to protect critical information assets against cybersecurity threats." },
      intermediate: { q: "Explain the importance of model explainability in banking.", a: "Under credit regulation laws (like ASIC guidelines), a bank must be able to explain exactly why a customer's loan application was rejected, meaning AI models cannot act as opaque black boxes." },
      senior: { q: "How do you design an audit trail system for an agentic loan pipeline?", a: "Log every step of the agent execution (thought, action, output) to a write-once secure database with cryptographic hashes to prevent tampering." },
      architect: { q: "Design a regulatory-compliant credit evaluation system.", a: "Input validation ➔ AML scan agent ➔ Credit risk scorecard logic ➔ LLM summarizer ➔ Pause for human review ➔ S3 archive." },
      systemDesign: { q: "Design an automated suspicious activity detection flow.", a: "Transaction logs stream ➔ vector lookup in OpenSearch ➔ flag anomalies ➔ trigger AML agent review." },
      behavioral: { q: "Describe how you aligned an AI product with bank compliance guidelines.", a: "I audited the data flow, introduced local PII masking, set up secure VPC endpoints for API calls, and built a detailed audit log system to meet APRA requirements." }
    },
    assignment: "Create a Python file mapping customer details to regulatory checklists, verifying compliance prior to loan processing.",
    quizzes: [
      {
        question: "Which regulatory body sets cybersecurity compliance standards (CPS 234) for banks in Australia?",
        type: "mcq",
        options: ["ASIC", "APRA", "RBA", "AUSTRAC"],
        correctIndex: 1,
        explanation: "APRA regulates prudential standards, including information security rules for financial entities."
      }
    ],
    flashcards: [
      { front: "KYC", back: "Know Your Customer: the mandatory process of identifying and verifying a client's identity." }
    ],
    revisionSummary: "Audit all AI decisions. Enforce APRA security standards. Mask user data. Keep humans in the loop for final approvals.",
    tutorResponses: {
      eli5: "Banking AI is like having a super-smart assistant who knows all the bank rules, checks if people are who they say they are, and writes down every step so the police can verify it later.",
      college: "Financial AI systems must satisfy strict compliance gates, prioritizing deterministic verification over raw generative outputs.",
      senior: "Always decouple compliance logic from LLM layers. Write automated test cases to evaluate compliance under edge queries.",
      architect: "Establish write-once audit logs. Use secure KMS keys to encrypt all stored customer vectors.",
      banking: "All AI applications at CBA must submit compliance reports to risk committees before production runs.",
      story: "We designed a loan scoring LLM. To meet ASIC rules, we added an explainability node that lists the exact credit parameters checked, creating a clear audit report for compliance officers."
    },
    videos: [
      {
        title: "APRA CPS 234 Cybersecurity Compliance",
        url: "https://www.youtube.com/watch?v=wjZofJX0v4M",
        duration: "30m",
        provider: "AWS",
        category: "Enterprise",
        instructor: "Mark",
        year: 2024,
        whyRecommended: "Mark covers compliance controls and VPC architectures in Australian banks visually.",
        learningObjectives: ["Understand CPS 234 controls", "Secure bank architectures"],
        prerequisites: ["None"],
        timestamps: [{ time: "00:00", label: "Intro" }],
        summary: "Introduction to APRA security compliance in cloud."
      }
    ]
  }
};

const topicProsCons: { [key: string]: { advantages: string[]; disadvantages: string[] } } = {
  "LLM Fundamentals": {
    advantages: [
      "High parallelizability during training compared to recurrent networks.",
      "Superior capture of long-range semantic dependencies in text.",
      "Unified foundational layer allowing standard task adaptation via SFT."
    ],
    disadvantages: [
      "Extremely high compute costs for training and execution inference.",
      "Quadratic memory growth O(N^2) based on sequence length inputs.",
      "Prone to semantic hallucinations when reasoning without reference data."
    ]
  },
  "Prompt Engineering": {
    advantages: [
      "Requires zero programming compilation to adjust model outputs.",
      "Allows instant prototyping and template iterations in gateways.",
      "Leverages the model's pre-trained knowledge base directly."
    ],
    disadvantages: [
      "Vulnerable to formatting drift and brittle parser failures.",
      "Slight query alterations can lead to unexpected model results.",
      "Large system instructions consume valuable context window tokens."
    ]
  },
  "RAG": {
    advantages: [
      "Direct grounding using real-time private database records.",
      "Completely bypasses expensive model training schedules.",
      "Provides transparent source citations for audit reviews."
    ],
    disadvantages: [
      "Highly dependent on chunking and retrieval recall quality.",
      "Multi-hop pipelines (search + rerank + LLM) multiply latency.",
      "Struggles to aggregate columns or perform numerical calculations."
    ]
  },
  "Embeddings": {
    advantages: [
      "Compresses complex textual meaning into simple coordinates.",
      "Enables fast semantic searching and indexing.",
      "Supports cross-lingual alignments and classification."
    ],
    disadvantages: [
      "Captures word correlations rather than facts (synonym confusion).",
      "High coordinate dimensionality requires specialized search indexes.",
      "Incompatible comparisons across different model versions."
    ]
  },
  "Vector Databases": {
    advantages: [
      "Scales search across millions of items under millisecond latencies.",
      "Natively supports metadata pre-filtering and partitions.",
      "Decouples memory index from generative model execution."
    ],
    disadvantages: [
      "Vector index building (like HNSW) consumes substantial memory.",
      "Search results are approximate (potential recall miss).",
      "Index update operations can lock table writes."
    ]
  },
  "AI Agents": {
    advantages: [
      "Automates multi-step workflows without linear programming constraints.",
      "Self-corrects errors via iterative node retry loops.",
      "Integrates external APIs and tools dynamically."
    ],
    disadvantages: [
      "Susceptible to infinite execution loop bugs under model errors.",
      "Unpredictable API cost spikes from recurrent inference loops.",
      "High complexity when tracing multi-agent state histories."
    ]
  },
  "MCP": {
    advantages: [
      "Standardizes tool and resource access schemas universally.",
      "Eliminates custom client adapter code duplication.",
      "Secure local stdio/SSE communication channels."
    ],
    disadvantages: [
      "Early-stage ecosystem with evolving standard specifications.",
      "Stdio channels block on long-running terminal prompts.",
      "Requires strict input parameter validation on the server side."
    ]
  },
  "LLMOps / MLOps": {
    advantages: [
      "Traces exactly where agent loops fail using span tracking.",
      "Audits API latency, costs, and token consumption parameters.",
      "Enables continuous integration evaluation metrics."
    ],
    disadvantages: [
      "Telemetry collection agents add minor execution latency.",
      "Storage costs for massive execution log spans can grow fast.",
      "Requires model-as-a-judge setups that require validation."
    ]
  },
  "Security": {
    advantages: [
      "Scrubbing PII prevents regulatory audit compliance failures.",
      "Jailbreak filters defend system instructions from bypasses.",
      "Moderates inputs and outputs to prevent toxic content leaks."
    ],
    disadvantages: [
      "Scrubbing regex false-flags valid technical terminology.",
      "Double guardrail checks (inbound and outbound) add latency.",
      "Safety models can be bypassed by complex jailbreak prompts."
    ]
  },
  "Cloud": {
    advantages: [
      "AWS Bedrock VPC endpoints keep customer data isolated.",
      "Managed model APIs scale instantly without GPU server tasks.",
      "Least-privilege IAM policies secure resources."
    ],
    disadvantages: [
      "Dependent on regional model availability limits.",
      "Data transit fees over private NAT gateways add cost.",
      "Complex configuration of IAM and subnet routing schemas."
    ]
  },
  "Backend Engineering": {
    advantages: [
      "Asynchronous routes prevent blocked connection threads.",
      "Connection pools recycle active database sessions.",
      "Redis/Celery task queues handle long-running jobs safely."
    ],
    disadvantages: [
      "Asynchronous code paths increase debugging difficulty.",
      "Requires separate monitoring for background queue health.",
      "Schema migrations (Alembic) require strict database locking rules."
    ]
  },
  "Banking Domain Knowledge": {
    advantages: [
      "Ensures absolute compliance with APRA CPS 234 standards.",
      "Reduces risks of illegal transaction routing.",
      "Double-authentication approval gates protect funds."
    ],
    disadvantages: [
      "Rigid security compliance checks limit chat flexibility.",
      "Complex design reviews slow down deploy times.",
      "High integration complexity with legacy core banking databases."
    ]
  }
};

// Helper to generate template content dynamically based on topic, injecting day-specific values
function createTemplateDay(id: number, week: number, title: string, topic: string): DayData {
  const metadata = topicMetadataMap[topic] || topicMetadataMap["LLM Fundamentals"];
  const prosCons = topicProsCons[topic] || { advantages: ["N/A"], disadvantages: ["N/A"] };

  return {
    id,
    week,
    title,
    topic,
    difficulty: metadata.difficulty,
    learningTime: "2 Hours",
    prerequisites: ["Python fundamentals", "Basic neural network concepts", "Model APIs"],
    industryUsage: `Core enterprise framework pattern for deploying ${topic} solutions.`,
    learningOutcomes: [
      `Analyze the core parameters of ${title}`,
      `Build a Python implementation representing ${title} workflows`,
      `Design an architectural deployment pattern for ${title} under banking regulations`
    ],
    overviewText: `${title} is a critical component in your mastery of ${topic}. In this lesson, we break down why it was created, its role in solving enterprise scaling or security limits, and how it is implemented.`,
    whyMatters: `Without ${title}, your ${topic} pipelines risk latency bottlenecks, quality regression, or security vulnerabilities in production. ${metadata.whyMatters}`,
    examples: [...metadata.examples, `${title} CBA mock services`],
    story: `On Day ${id}, let's trace the story of ${title}. ${metadata.story}`,
    analogyTitle: `${metadata.analogyTitle} for ${title}`,
    analogyContent: `${metadata.analogyContent} Specifically, ${title} acts as the custom parameter controller routing inputs safely.`,
    memoryHook: `${metadata.memoryHook} (Day ${id}: Focus on ${title})`,
    mnemonics: [...metadata.mnemonics],
    architectureSteps: [...metadata.architectureSteps],
    architectureDetails: { ...metadata.architectureDetails },
    bankingUseCase: {
      title: `${title} Integration in Banking`,
      description: `Implementing ${title} logic to automate data routing, security audit checks, or workflow loops.`,
      implementation: `Develop an asynchronous FastAPI python endpoint that integrates ${title} structures and parses variables.`
    },
    codeWalkthrough: {
      language: "python",
      code: `
# CBA Production Template: ${title}
import asyncio
from pydantic import BaseModel

class CBAAccountPayload(BaseModel):
    account_id: str
    risk_score: float

async def execute_pipeline():
    print("Loading CBA ${title} logic parameters...")
    await asyncio.sleep(0.5)
    print("Compliance checks complete. Running task...")
    return {"status": "success", "day": ${id}}

if __name__ == '__main__':
    res = asyncio.run(execute_pipeline())
    print(res)
`,
      architectureDescription: `Thin client executing async loops to process ${title} configurations.`,
      bestPractices: ["Ensure async execution paths", "Write comprehensive schemas", "Monitor trace telemetry"],
      productionNotes: "Verify connection timeouts and implement automatic circuit-breaker fallback triggers."
    },
    commonMistakes: { ...metadata.commonMistakes },
    interviewQuestions: { ...metadata.interviewQuestions },
    assignment: `Build a local Python file in your daily_assignments directory named 'day_${id}_${title.toLowerCase().replace(/[^a-z0-9]/g, "_")}.py' demonstrating the core functions.`,
    quizzes: [...metadata.quizzes],
    flashcards: [...metadata.flashcards],
    revisionSummary: `Quickly review the role of ${title} inside ${topic}. Focus on async interfaces, validation models, and compliance checks. ${metadata.revisionSummary}`,
    tutorResponses: { ...metadata.tutorResponses },
    videos: [...metadata.videos],
    advantages: [...prosCons.advantages],
    disadvantages: [...prosCons.disadvantages],
    connections: {
      previous: id > 1 ? `Day ${id - 1}` : "Start",
      next: id < 90 ? `Day ${id + 1}` : "Graduation",
      related: [topic]
    }
  };
}

// Detailed records for important Days
const detailedCourseData: DayData[] = [];

// Dynamic Syllabus Array builder containing 90 entries
export const courseData: DayData[] = [];

// Array of explicit titles matching all 90 days to ensure a complete professional curriculum
const dailySyllabusTitles = [
  // Week 1: LLM Fundamentals
  "LLM Architectures & Transformers",
  "Attention Mechanisms (Multi-Head & Scaled)",
  "Word Embeddings & Semantic Vectors",
  "Tokenization & Byte Pair Encoding (BPE)",
  "Encoder vs Decoder architectures (BERT vs GPT)",
  "Context Windows & Positional Encoding",
  "Pre-training, SFT, and RLHF concepts",
  // Week 2: Prompt Engineering
  "System Instructions & Structured Prompt Design",
  "Zero-Shot, Few-Shot, & Chain-of-Thought (CoT)",
  "ReAct (Reasoning & Acting) Prompt Patterns",
  "XML Tag Structuring for Claude & Bedrock",
  "Structured Outputs with Pydantic & JSON Mode",
  "Prompt Injection Vectors & Defensive Prompts",
  "Prompt Versioning & PromptOps pipelines",
  // Week 3: RAG
  "RAG Architectures & Naive Retrievers",
  "Recursive Character & Semantic Chunking",
  "Document Parsing & Metadata Ingestion",
  "Query Re-writing & Hypothetical Document Embeddings (HyDE)",
  "Reranking Models & Cross-Encoders (Cohere Rerank)",
  "Corrective RAG (CRAG) & Self-RAG pipelines",
  "RAG Evaluation Metrics (Ragas & TruLens)",
  // Week 4: Embeddings
  "Math of Embeddings & Similarity Metrics",
  "Dense vs Sparse Vectors (bi-encoders vs BM25)",
  "Choosing Embedding Models & Dimensionality Bounds",
  "Local Embedding Generation via Sentence-Transformers",
  "API-based Embeddings (AWS Bedrock Titan / OpenAI)",
  "Dimensionality Reduction (PCA & t-SNE)",
  "Multimodal Embeddings (Text-to-Image CLIP)",
  // Week 5: Vector Databases
  "Vector DB Indexing Algorithms (HNSW, IVF, Flat)",
  "PostgreSQL & pgvector migrations",
  "Pinecone Serverless Vector Clusters",
  "Amazon OpenSearch Serverless Vector Store",
  "ChromaDB & FAISS for local prototyping",
  "Hybrid Search Indexing & Reciprocal Rank Fusion (RRF)",
  "Metadata Filtering & Index Optimization",
  // Week 6: AI Agents (LangGraph)
  "Agentic Loops vs Linear Pipelines",
  "LangGraph Core Primitives (Nodes, Edges, State)",
  "Router Nodes & Conditional Edges",
  "State Checkpointers & Persistence (PostgresSaver)",
  "Human-in-the-loop Gates & Breakpoint Interruption",
  "Subgraphs & Multi-Agent hierarchies",
  "Debugging and Tracing Graph States",
  // Week 7: AI Agents (CrewAI)
  "CrewAI Architecture (Agents, Tasks, Crews)",
  "Sequential vs Hierarchical Crew Workflows",
  "Agent Collaboration & Shared Memory pools",
  "Self-Correction loops in Multi-Agent Swarms",
  "Integrating Custom Tools in CrewAI",
  "Managing Agent Hallucinations and Infinite Loops",
  "Designing a CBA Mortgage Underwriting Crew",
  // Week 8: MCP
  "Model Context Protocol (MCP) Architecture",
  "Creating Custom MCP Tool Servers (stdio)",
  "Creating Custom MCP Resource Servers (SSE)",
  "Binding MCP to Cursor IDE & Claude Code",
  "Security Approval gates for Local MCP execution",
  "Enterprise Databases as MCP Resources",
  "Production MCP Server Deployments",
  // Week 9: LLMOps / MLOps
  "LLM Tracing & Logging Spans (Arize Phoenix / LangSmith)",
  "Evaluation Metrics (Accuracy, Hallucinations, Cost)",
  "Continuous Integration for Prompt Templates",
  "Quantization formats (GGUF, AWQ) & Local Run (Ollama)",
  "Fine-tuning Local Models (LoRA & PEFT)",
  "Semantic caching with Redis & GPTCache",
  "Cost Auditing & Rate Limits management",
  // Week 10: Security
  "OWASP Top 10 for LLMs & Jailbreak mitigation",
  "PII Masking & Scrubbing (Microsoft Presidio)",
  "LlamaGuard for Input/Output Content Moderation",
  "Prompt Injections & Defensive System Guardrails",
  "APRA CPS 234 Cybersecurity standards in Banks",
  "Data Sovereignty, Residency, and VPC sandboxes",
  "Auditing Model Logs & Incident Response",
  // Week 11: Cloud
  "AWS Bedrock Model Access & Runtime API",
  "Least-Privilege AWS IAM Policies & VPC Endpoints",
  "Serverless AI with AWS Lambda & Bedrock",
  "Deploying LLM Services on Docker & ECS",
  "Scaling Models with Kubernetes (EKS)",
  "AWS Bedrock Guardrails configurations",
  "Outage Failovers & Multi-Region LLM deployments",
  // Week 12: Backend Engineering & Banking Domain Knowledge
  "Asynchronous Web API design with FastAPI",
  "Celery & Redis Task Queues for long running reports",
  "SQL Database Connection Pools & Alembic migrations",
  "Banking Core System Integration patterns",
  "Semantic Transaction Log Audit pipelines",
  "KYC Identity Verification Swarms",
  "AML Watchlist Scan & SAR report agents",
  "CBA Credit Risk Policy RAG engine",
  "Basel Risk reporting pipelines",
  "ASIC regulatory compliance auditing AI",
  "Model Versioning & Disaster Outage recovery",
  "Capstone Project: CBA Compliance Audit System",
  "CBA AI-OS Graduation & Job Readiness Evaluation"
];

// Populate syllabus loop
for (let i = 1; i <= 90; i++) {
  const week = Math.ceil(i / 7);
  
  // Align topics strictly with week categories
  let topic = "LLM Fundamentals";
  if (week === 2) topic = "Prompt Engineering";
  else if (week === 3) topic = "RAG";
  else if (week === 4) topic = "Embeddings";
  else if (week === 5) topic = "Vector Databases";
  else if (week === 6) topic = "AI Agents"; // LangGraph
  else if (week === 7) topic = "AI Agents"; // CrewAI
  else if (week === 8) topic = "MCP";
  else if (week === 9) topic = "LLMOps / MLOps";
  else if (week === 10) topic = "Security";
  else if (week === 11) topic = "Cloud";
  else if (week === 12) topic = "Banking Domain Knowledge"; // Backend & CBA

  const computedTitle = dailySyllabusTitles[i - 1] || `Day ${i} AI Automation Lesson`;
  
  courseData.push(createTemplateDay(i, week, computedTitle, topic));
}
