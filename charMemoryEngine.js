class ChatHistory {
  constructor(
    agent,
    agentdetails,
    getsummary,
    getTokens,
    length = 10,
    longterm = true,
    superlongterm = true,
    targetTokens = 2000,
    getokens,
    history = [],
    longHistory = [],
    sumMessage = `<|im_start|>system
   summarize these messages for system use. After, list the inventory of items tools and technology used by order of importance to the instructions or story so that nothing important is left behind.`
  ) {
    this.agent = agent;
    this.getSummary = getsummary;
    this.history = history;
    this.historyTokens = 0;
    this.lastUser = "";
    this.lastAI = "";
    this.length = length;
    this.targetTokens = targetTokens;
    this.longterm = longterm;
    this.superlongterm = superlongterm;
    this.superHistory = longHistory;
    this.superHistoryTokens = 0;
    this.getokens = getokens;
    this.agentTokens = 0;
    this.agentDetails = agentdetails;
    this.getAgentTokens();
    this.sumMessage = sumMessage;
    this.userTokens = 0;
    this.aiTokens = 0;
    this.summaryTokens = 0;
  }
  updateHistory() {
    if (this.longterm) {
      if (this.history.length >= this.length) {
        let superhistoryuser = this.history.shift();
        let superhistoryAi = this.history.shift();
        this.history.push({ user: this.lastUser, t: this.userTokens });
        this.history.push({ assistant: this.lastAI, t: this.lastAITokens });
        if (this.superlongterm.length)
          this.getsummary(
            this.sumMessage +
              stringify(superhistoryuser) +
              JSON.stringify(superhistoryAi),
            newLongterm()
          );
        return;
      }
      this.history.push({ user: this.lastUser, t: this.userTokens });
      this.history.push({ assistant: this.lastAI, t: this.lastAITokens });
    }
  }
  //todo: bring in user, ai messages and get token lengths,

  returnUserData(text) {
    this.lastUser = text;
  }
  returnAIdata(text) {
    this.lastAI = text;
  }
  returnUserTokens(tokens) {
    this.userTokens = tokens;
  }
  returnAITokens(tokens) {
    this.aiTokens = tokens;
  }
  newLongterm(summarized) {
    if (
      this.superHistoryTokens + summarized.stats.tokens >=
      this.targetTokens * 0.5
    ) {
      //todo get the right token length from response
      this.getsummary(
        this.sumMessage +
          JSON.stringify(this.superHistory) +
          JSON.stringify(summarized.text),
        newSuperLongterm()
      );
      //this.superHistory = []
    } else {
      this.superHistory.push(summarized.text);
      this.superHistoryTokens += summarize.stats.tokens;
    }
  }
  newSuperLongterm(summarized) {
    this.superHistory = [];
    this.superHistory.push(summarized.text);
    this.superHistoryTokens = summarize.stats.tokens;
  }

  returnHistoryTokens(tokencount) {
    this.historyTokens = tokencount;
  }
  getHistory() {
    return this.history;
  }
  getsummaryTokens(text) {
    this.getokens(text, this.returnSummaryTokens);
  }
  returnSummaryTokens(tokenCount) {
    this.userTokens = tokenCount;
  }
  setLastUser(lastUser, tokenCount) {
    this.userTokens = tokenCount;
    this.lastUser = lastUser;
  }
  setLastAi(lastAi) {
    this.getTokens(lastAi, returnAITokens); //this might not be able to live here
    this.lastAI = lastAi;
  }
  toggleLongterm() {
    this.longterm = !this.longterm;
  }
  getAgentTokens() {
    this.getTokens(this.agentdetails, this.agent, this.returnAgentTokens);
  }
  returnAgentTokens(agenttokenCount) {
    this.agentTokens = agenttokenCount;
  }
}