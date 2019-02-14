"use strict";

/**
 * Fichier permettant de dessiner le diagramme à cordes.
 */


/**
 * Crée les groupes du diagramme à cordes.
 *
 * @param g               Le groupe SVG dans lequel le diagramme à
 * 												cordes doit être dessiné.
 * @param data            Les données provenant du fichier JSON.
 * @param layout          La disposition utilisée par le diagramme à cordes.
 * @param arc             Fonction permettant de dessiner les arcs.
 * @param color           L'échelle de couleurs qui est associée à
 * 												chacun des noms des stations de BIXI.
 * @param total           Le nombre total de trajets réalisés pour le
 * 												mois d'août 2015.
 * @param formatPercent   Fonction permettant de formater correctement
 * 												un pourcentage.
 *
 * @see https://bl.ocks.org/mbostock/4062006
 */
function createGroups(g, data, layout, arc, color, total, formatPercent) {
  /* TODO:
     - Créer les groupes du diagramme qui sont associés aux stations
       de BIXI fournies.
     - Utiliser un "textPath" pour que les nom de stations suivent la
       forme des groupes.
     - Tronquer les noms des stations de BIXI qui sont trop longs
       (Pontiac et Métro Mont-Royal).
     - Afficher un élément "title" lorsqu'un groupe est survolé par la
       souris.
  */

	let groups = g
			.selectAll("g")
			.data(layout.groups)
			.enter()
			.append("g")
	;

	let arcs = groups
			.append("path")
			.attr("d", arc)
			.attr("id", (d,i) => { return `arc${i}` })
			.attr("fill", (d,i) => { return color(i) })
	;
	let labels = groups
			.append("text")
			.attr("dx", 5)
			.attr("dy", 5)
			.append("textPath")

			.attr("dominant-baseline", "hanging")
			.style("font-size", "12px")
			.attr('fill', 'white')
			.attr("xlink:href", (d,i) => { return `#arc${i}` })
			.text((d,i) => {
				let labelName = data[i].name;

				// ¯\_(ツ)_/¯
				if ( labelName.startsWith("Pontiac") )
					return "Pontiac";
				else if ( labelName.startsWith("Métro Mont-") )
					return "Métro Mont-Royal";
				else
					return labelName;
			})
	;

}

/**
 * Crée les cordes du diagramme à cordes.
 *
 * @param g               Le groupe SVG dans lequel le diagramme à
 * 												cordes doit être dessiné.
 * @param data            Les données provenant du fichier JSON.
 * @param layout          La disposition utilisée par le diagramme à cordes.
 * @param path            Fonction permettant de dessiner les cordes.
 * @param color           L'échelle de couleurs qui est associée à
 * 												chacun des noms des stations de BIXI.
 * @param total           Le nombre total de trajets réalisés pour le
 * 												mois d'août 2015.
 * @param formatPercent   Fonction permettant de formater correctement
 * 												un pourcentage.
 *
 * @see https://beta.observablehq.com/@mbostock/d3-chord-dependency-diagram
 */
function createChords(g, data, layout, path, color, total, formatPercent) {
  /* TODO:
     - Créer les cordes du diagramme avec une opacité de 80%.
     - Afficher un élément "title" lorsqu'une corde est survolée par
       la souris.
  */

}

/**
 * Initialise la logique qui doit être réalisée lorsqu'un groupe du
 * diagramme est survolé par la souris.
 *
 * @param g     Le groupe SVG dans lequel le diagramme à cordes est dessiné.
 */
function initializeGroupsHovered(g) {
  /* TODO:
     - Lorsqu'un groupe est survolé par la souris, afficher les cordes
       entrant et sortant de ce groupe avec une
       opacité de 80%. Toutes les autres cordes doivent être affichées
       avec une opacité de 10%.
     - Rétablir l'affichage du diagramme par défaut lorsque la souris
       sort du cercle du diagramme.
  */

}
