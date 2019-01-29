
"use strict";

/**
 * Fichier permettant de générer la légende et de gérer les interactions de celle-ci.
 */


/**
 * Crée une légende à partir de la source.
 *
 * @param svg       L'élément SVG à utiliser pour créer la légende.
 * @param sources   Données triées par nom de rue et par date.
 * @param color     Échelle de 10 couleurs.
 */
function legend(svg, sources, color) {
	// TODO: Créer la légende accompagnant le graphique.

	let legend = svg
		.select("g")
		.append("g")
		.attr("class", "legend")
		.style("font-size","12px");

	let names = legend
		.selectAll("g")
		.data(sources)
		.enter()
		.append("text")
		.text((d) => {
			return d.name;
		})
		.attr("x", 40)
		.attr("y", (d, i) => {
			return 20 + i * 20;
		});

	let squares = legend
		.selectAll("g")
		.data(sources)
		.enter()
		.append("rect")
		.attr("data-id", (d, i) => i)
		.attr("width" , 10)
		.attr("height", 10)
		.attr("x", 20)
		.attr("y", (d, i) => {
			return 10 + i * 20;
		})
		.style("fill", d => color(d.name))
		.style("cursor", "pointer")
		.attr("stroke", "#c1c1c1")
		.on("click", (d, i, nodes) => {
			displayLine(nodes[i], color(d.name));
		});
}

/**
 * Permet d'afficher ou non la ligne correspondant au carré qui a été cliqué.
 *
 * En cliquant sur un carré, on fait disparaitre/réapparaitre la ligne correspondant et l'intérieur du carré
 * devient blanc/redevient de la couleur d'origine.
 *
 * @param element   Le carré qui a été cliqué.
 * @param color     Échelle de 10 couleurs.
 */
function displayLine(element, color) {

	let line = d3.select(`#line_${element.getAttribute("data-id")}`)

	if (parseInt(line.style("opacity")) !== 0) {
		element.style.fill = "#fff";
		line.style('opacity', 0);
	} else {
		element.style.fill = color;
		line.style('opacity', 1);
	}
}
