"use strict";

/**
 * Fichier permettant de dessiner les graphiques "focus" et "contexte".
 */


/**
 * Crée une ligne SVG en utilisant les domaines X et Y spécifiés.
 * Cette fonction est utilisée par les graphiques "focus" et "contexte".
 *
 * @param x               Le domaine X.
 * @param y               Le domaine Y.
 * @return d3.svg.line    Une ligne SVG.
 *
 * @see https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89      (voir line generator)
 */
function createLine(x, y) {
	return d3.line().x((d, i) => x(d.date)).y((d) => y(d.count)).curve(d3.curveBasisOpen);
}

/**
 * Crée le graphique focus.
 *
 * @param g         Le groupe SVG dans lequel le graphique doit être dessiné.
 * @param sources   Les données à utiliser.
 * @param line      La fonction permettant de dessiner les lignes du graphique.
 * @param color     L'échelle de couleurs ayant une couleur associée à un nom de rue.
 */
function createFocusLineChart(g, sources, line, color) {
	g
		.selectAll("path")
		.data(sources)
		.enter()
		.append("path")
		.attr('id', (d, i) => `line_${i}`)
		.attr("d", (d,i) => {
			return line(d.values);
		})
		.attr("stroke", (d,i) => {
			return color(i);
		})
		.attr("stroke-width", 1)
		.attr("fill", "none")
		.attr("class", "line")
		.attr("clip-path", "url(#clip)"); // to be able to modify it later
}

/**
 * Crée le graphique contexte.
 *
 * @param g         Le groupe SVG dans lequel le graphique doit être dessiné.
 * @param sources   Les données à utiliser.
 * @param line      La fonction permettant de dessiner les lignes du graphique.
 * @param color     L'échelle de couleurs ayant une couleur associée à un nom de rue.
 */
function createContextLineChart(g, sources, line, color) {
	g
		.selectAll("path")
		.data(sources)
		.enter()
		.append("path")
		.attr("d", (d,i) => {
			return line(d.values);
		})
		.attr("stroke", (d,i) => {
			return color(i);
		})
		.attr("stroke-width", 1)
		.attr("fill", "none");
}
