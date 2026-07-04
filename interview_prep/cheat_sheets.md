# Visual Memory Cheat Sheets (AI & Agentic Architectures)

Use these visual mappings and mnemonics to retain core conceptual structures for senior engineering and systems design interviews.

---

## 1. LLM Fundamentals (Self-Attention)
* **Analogy**: **The High-End Cocktail Party**
  * When a sentence is spoken, every word is an attendee. Instead of only talking to immediate neighbors, each attendee scans the room (Self-Attention) and establishes query-key relationships to find whom they are logically connected to (e.g. 'Bank' looks at 'River' or 'Savings' to resolve ambiguity).
* **Mnemonic Formula**:
  * `Q` = Query (What am I looking for?)
  * `K` = Key (What properties do I offer?)
  * `V` = Value (What is my actual content?)
  * `Attention(Q,K,V) = Softmax(QKᵀ / √d) * V`

---

## 2. Retrieval-Augmented Generation (RAG)
* **Analogy**: **The Open-Book Exam**
  * Instead of forcing the model to memorize everything (Fine-Tuning/Closed-Book), we give it a search bar. The model searches our Vector database (Library indexing), grabs the top 3 pages (Retrieval), paste them into the prompt (Context Insertion), and summarizes the answer (Reader generation) with exact citations.
* **Mnemonic Sequence**:
  * **I-C-V-S-R-G** (I Can Value Simple RAG Guides):
    * **I**ngest ➔ **C**hunk ➔ **V**ectorize ➔ **S**earch ➔ **R**erank ➔ **G**enerate

---

## 3. Model Context Protocol (MCP)
* **Analogy**: **USB-C for Artificial Intelligence**
  * Prior to MCP, hooking an LLM to a SQL database, local filesystem, or API required custom integration adapters. MCP standardizes the connection. Any model client (Claude Code, Claude Desktop) talks standard JSON-RPC 2.0 transport queries to any local or remote MCP server (Postgres, FileSystem, GitHub) exposing Tools, Resources, and Prompts.
* **Mnemonic Primitives**:
  * **R-P-T** (Registered Ports Transmit):
    * **R**esources (static files/read-only logs)
    * **P**rompts (predefined templates)
    * **T**ools (executable backend functions)

---

## 4. LangGraph (Agentic Workflows)
* **Analogy**: **The Train Network**
  * Standard chains are single-direction pipelines. LangGraph allows loops and cycles.
  * **State** = The train cargo (a central dictionary containing all memory state values).
  * **Nodes** = Stations (Python functions that execute code and return updates to the cargo).
  * **Edges** = The tracks.
  * **Conditional Edges** = Track switches (evaluates cargo data and routes the train to Node A or Node B).
  * **Checkpointer** = The Auto-Save State (allows pausing execution for human approval and rollback/time-travel).

---

## 5. Security & PII Masking
* **Analogy**: **The Permanent Marker**
  * To comply with banking security regulations (APRA CPS 234), never send raw transaction histories containing customer names, credit card numbers (PANs), or locations to cloud LLM APIs.
  * Run a local scrubber (Permanent Marker) using Presidio or regex that replaces sensitive entities with unique tokens (e.g. `[CUSTOMER_A]`, `[CARD_X]`), sends the masked query, and maps the tokens back locally once the model responds.

---

## 6. Classical Machine Learning Foundations
* **Gradient Descent**: **The Foggy Mountain Walk**
  * Optimization is like walking down a mountain in thick fog. You feel the slope with your boots and step down the steepest way (gradient) until you reach the lowest valley floor (global minimum).
* **Precision vs Recall**: **The Police Arrest**
  * **Recall**: Catching as many bank robbers as possible (even if you accidentally pull over some innocent drivers).
  * **Precision**: Ensuring that everyone you arrest is *actually* a bank robber (avoiding false accusations).
* **XGBoost Ensembles**: **The Golf Team Relay**
  * Instead of 100 experts voting independently (Bagging / Random Forest), boosting is sequential. Player 1 hits the ball (first tree), Player 2 steps up and hits it from where the first shot landed, correcting the remaining error (second tree), sequentially getting closer to the pin.

---

## 7. Deep Learning & PyTorch Loops
* **Neural Network weights**: **The Water Filter Mesh Dials**
  * A neural network is like a water filtration plant. Input data (water) flows through screens (hidden layers) with adjustable dials (weights). Backpropagation checks the mud levels of the output (loss) and sends signals back to adjust dials automatically.
* **PyTorch Training Loop Mnemonic**:
  * **Z-F-L-B-S** (**Z**ebra **F**inds **L**ion **B**ehind **S**tone):
    1. **Z**ero: `optimizer.zero_grad()` - Wipe the whiteboard clean.
    2. **F**orward: `preds = model(x)` - Make a guess.
    3. **L**oss: `loss = criterion(preds, y)` - Check the answer key.
    4. **B**ackward: `loss.backward()` - Backpropagate gradient errors.
    5. **S**tep: `optimizer.step()` - Shift weight parameters.

