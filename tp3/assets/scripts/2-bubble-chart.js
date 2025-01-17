"use strict";

/**
 * Fichier permettant de dessiner le graphique à bulles.
 */


/**
 * Crée les axes du graphique à bulles.
 *
 * @param g       Le groupe SVG dans lequel le graphique à bulles doit être
 *                dessiné.
 * @param xAxis   L'axe X.
 * @param yAxis   L'axe Y.
 * @param height  La hauteur du graphique.
 * @param width   La largeur du graphique.
 */
function createAxes(g, xAxis, yAxis, height, width) {
	g.append("g")
		.attr("transform", `translate(0,${height})`)
		.call(xAxis);
	g.append("g")
		.call(yAxis);

	const titleOffset = 6;
	const yAxisTitle = "Revenu (USD)";
	g.append("text").text((d) => {
		return yAxisTitle;
	})
		.attr("text-anchor", "end")
		.attr("dominant-baseline", "hanging")
		.attr("transform",
					`translate (${titleOffset}, 0) \
				   rotate    (-90)`)
	;
	const xAxisTitle = "Espérance de vie (années)";
	g.append("text").text((d) => {
		return xAxisTitle;
	})
		.attr("text-anchor", "end")
		.attr("transform",
					`translate(${width}, \
                     ${height - titleOffset})`)
	;
}

/**
 * Crée le graphique à bulles.
 *
 * @param g       Le groupe SVG dans lequel le graphique à bulles doit être
 *                dessiné.
 * @param data    Les données à utiliser.
 * @param x       L'échelle pour l'axe X.
 * @param y       L'échelle pour l'axe Y.
 * @param r       L'échelle pour le rayon des cercles.
 * @param color   L'échelle pour la couleur des cercles.
 * @param tip     L'infobulle à afficher lorsqu'un cercle est survolé.
 */
function createBubbleChart(g, data, x, y, r, color, tip) {
  // TODO: Dessiner les cercles du graphique en utilisant les échelles spécifiées.
  //       Assurez-vous d'afficher l'infobulle spécifiée lorsqu'un cercle est survolé.
	g.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("r", (d) => {
			return r(d.population);
		})
		.attr("cx", (d) => {
			return x(d.lifeExpectancy);
		})
		.attr("cy", (d) => {
			return y(d.income);
		})
		.attr("fill", (d,i) => {
			return color(i);
		})
		.on("mouseover", tip.show)
		.on("mouseout",  tip.hide)
	;
}
