// Each preview lives in a fresh frame, isolating the legacy renderer's globals,
// tooltips and listeners. Removing the frame disposes the entire renderer.
window.renderComparison = function (input) {
  var message = document.getElementById('message');
  var sources = input.sources.filter(function (source) { return source.text !== null && source.text.trim() !== ''; });
  if (sources.length < 2) {
    message.textContent = sources.length === 1 ? sources[0].text : 'Enter text in at least two sources to compare them.';
    message.dir = input.rtl ? 'rtl' : 'ltr';
    return;
  }
  var tokens = sources.reduce(function (count, source) { return count + source.text.trim().split(/\s+/).length; }, 0);
  if (tokens > 600) {
    message.textContent = 'This row is too long for a responsive preview. Split it into smaller rows (up to 600 words across visible sources). Your full text can still be saved.';
    return;
  }
  try {
    var graph = new TRAViz('graph', { plainText: true, normalize: input.normalize, rtl: input.rtl,
      splitAndMerge: false, font: 'Georgia, serif', fontSizeMin: 18, fontSizeIncrease: 2,
      lineBreaks: true, lineNumbering: false, vertexBackground: false, connectionType: 'all' });
    graph.align(sources.map(function (source) { return { edition: source.id, label: source.label, text: source.text }; }));
    var colors = {};
    sources.forEach(function (source) { colors[source.id] = source.color; });
    graph.setColorMap(colors);
    if (sources.some(function (source) { return source.id === input.mainSourceId; })) graph.mainBranch = input.mainSourceId;
    graph.visualize();
    window.currentGraph = graph;
  } catch (error) {
    document.getElementById('graph').replaceChildren();
    message.textContent = 'This passage could not be laid out. Your text is still available in the editor. Try a shorter row.';
    console.error(error);
  }
};
