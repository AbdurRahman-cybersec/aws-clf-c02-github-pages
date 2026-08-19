(function () {
  const MAX_TRIGGER_LENGTH = 150;

  function clean(value) {
    return String(value || "")
      .replace(/\s*\((?:choose|select)\s+(?:two|three|2|3)\.?\)\s*/gi, " ")
      .replace(/\s+/g, " ")
      .replace(/^[\s,;:.-]+|[\s,;:?.-]+$/g, "")
      .trim();
  }

  function shorten(value) {
    const text = clean(value)
      .replace(/^(?:they|it)\s+can\s+/i, "")
      .replace(/^(?:can\s+)?be\s+used\s+to\s+/i, "")
      .replace(/^their\s+applications?\s+(?:is|are)\s+/i, "")
      .replace(/^(?:an?\s+)?example\s+of\s+/i, "")
      .replace(/^(?:the\s+)?options?\s+(?:is|are)\s+related\s+to\s+/i, "")
      .replace(/^regarding\s+/i, "");
    if (text.length <= MAX_TRIGGER_LENGTH) return text;

    const clipped = text.slice(0, MAX_TRIGGER_LENGTH + 1);
    const lastSpace = clipped.lastIndexOf(" ");
    return clipped.slice(0, lastSpace > 95 ? lastSpace : MAX_TRIGGER_LENGTH).trim() + "…";
  }

  function removeQuestionStem(value) {
    let text = clean(value);
    const stems = [
      /^(?:what|which)\s+should\s+(?:the\s+)?(?:customer|company|organization|user|application|team)\s+do\s+to\s+/i,
      /^(?:which|what)\s+of\s+the\s+following\s+(?:(?:aws\s+)?(?:service|services|feature|features|option|options|solution|solutions|example|examples|statement|statements|task|tasks|benefit|benefits|advantage|advantages)\s+)?(?:will|would|can|could|should|is|are|uses?|best\s+describes?|describes?|provides?|allows?(?:\s+for)?|helps?|enables?|offers?)?\s*/i,
      /^(?:which|what)\s+(?:of\s+the\s+)?(?:below|below\s+options?)\s+(?:is|are|will|would|can|could|should)?\s*/i,
      /^(?:which|what)\s+(?:aws\s+)?(?:service|services|feature|features|option|options|solution|solutions|tool|tools)\s+(?:will|would|can|could|should|is|are|best|provides?|allows?(?:\s+for)?|helps?|enables?|offers?|uses?)\s+/i,
      /^(?:which|what)\s+(?:statement|statements)\s+(?:is|are)\s+(?:true|correct)\s+/i,
      /^(?:which|what)\s+(?:statement|statements|task|tasks|benefit|benefits|advantage|advantages|pillar|principle)\s+(?:is|are|will|would|best|describes?)\s+/i,
      /^what\s+(?:is|are|does|do)\s+(?:the\s+)?/i,
      /^how\s+(?:can|could|does|do|should|will|would)\s+/i,
      /^where\s+(?:can|could|does|do|should|will|would)\s+(?:the\s+)?/i,
      /^who\s+(?:is|are|does|do|should|will|would)\s+(?:the\s+)?/i
    ];

    for (const stem of stems) {
      const stripped = text.replace(stem, "");
      if (stripped !== text) {
        text = stripped;
        break;
      }
    }

    return clean(text);
  }

  function requirementFrom(value) {
    const text = clean(value);
    const patterns = [
      /\b(?:there\s+is\s+a\s+requirement\s+to|the\s+requirement\s+is\s+to|needs?|wants?|requires?|must|is seeking|are seeking|is looking for|are looking for)\s+(?:a\s+(?:way|solution|service|feature|option)\s+(?:in\s+which|that|to)\s+)?(?:to\s+)?(.+)$/i,
      /\b(?:most\s+cost-effective|best|suitable)\s+(?:service\s+|option\s+|solution\s+)?for\s+(.+)$/i,
      /\b(?:used|use)\s+to\s+(.+)$/i,
      /\b(?:so that|in order to)\s+(.+)$/i
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && clean(match[1]).length >= 12) return clean(match[1]);
    }
    return "";
  }

  function questionTrigger(question) {
    const normalized = clean(question);
    const sentences = String(question || "")
      .replace(/\s*\((?:choose|select)\s+(?:two|three|2|3)\.?\)\s*/gi, " ")
      .split(/(?<=[.!?])\s+/)
      .map(clean)
      .filter(Boolean);

    const usefulSentences = sentences.filter(sentence =>
      !/^(?:choose|chose|select)\s+(?:two|three|2|3)\b/i.test(sentence)
    );

    // Scenario questions usually state the decisive constraint immediately before
    // the final "Which service..." sentence. Prefer that requirement when present.
    for (let index = usefulSentences.length - 1; index >= 0; index -= 1) {
      const requirement = requirementFrom(usefulSentences[index]);
      if (requirement) return shorten(requirement);
    }

    let candidate = usefulSentences[usefulSentences.length - 1] || normalized;
    const referencesEarlierContext = /\b(?:this|these|those|them|it|action|interface|issues?)\b/i.test(candidate);
    const earlierContext = usefulSentences.length > 1
      ? usefulSentences[usefulSentences.length - 2]
      : "";

    candidate = removeQuestionStem(candidate)
      .replace(/^(?:the\s+)?(?:customer|company|organization|user|application|team)\s+/i, "")
      .replace(/^(?:an?\s+)?(?:administrator|architect|developer|user)\s+to\s+/i, "")
      .replace(/^(?:they|it)\s+can\s+/i, "")
      .replace(/^you\s+/i, "")
      .replace(/^help\s+(?:to\s+)?(?:ensure\s+that\s+)?/i, "")
      .replace(/^(?:is|are)\s+(?:an?\s+)?/i, "")
      .replace(/^for\s+(?:the\s+)?/i, "")
      .replace(/\b(?:will|would)\s+meet\s+(?:these|the)\s+requirements?$/i, "")
      .replace(/\b(?:is|are)\s+correct\s+regarding\s+/i, "")
      .replace(/\bNOT\s+correct\s+regarding\s+/i, "NOT: ");

    if (referencesEarlierContext && earlierContext) {
      candidate = removeQuestionStem(earlierContext) + " — " + candidate;
    }

    return shorten(candidate || normalized);
  }

  function definitionTrigger(definition) {
    const text = removeQuestionStem(definition)
      .replace(/^(?:a|an|the)\s+/i, "")
      .replace(/^(?:aws\s+)?(?:managed\s+)?(?:service|tool|feature)\s+(?:that|which)\s+/i, "")
      .replace(/^(?:provides?|uses?|allows?|lets?|helps?|enables?)\s+/i, "");
    return shorten(text || definition);
  }

  window.AWS_EXAM_TRIGGER = Object.freeze({
    fromQuestion: questionTrigger,
    fromDefinition: definitionTrigger
  });
})();
