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
  
	let groups = g
		.selectAll("g")
		.data(layout.groups)
		.enter()
		.append("g")
		.attr("class", "arc");

	groups
		.append("path")
		.attr("d", arc)
		.attr("id",   (d,i) => { return `arc${i}` })
		.attr("fill", (d,i) => { return color(i)  });

	groups
		.append("text")
		.attr("dx", 10)
		.attr("dy", 7)
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
			else
			if ( labelName.startsWith("Métro Mont-") )
				return "Métro Mont-Royal";
			else
				return labelName;
		});

	groups.append("title")
	.text( (d,i) => {
		let name = data[i].name;
		let departsCount = data[i].destinations.reduce((acc,val) => {
			return {count: acc.count + val.count};
		}, { count: 0 }).count;
		const percentage = formatPercent( departsCount / total );
		return `${name}: ${percentage} des départs`;
	});
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

	g.selectAll("path")
		.data(layout)
		.enter()
		.append("path")
		.attr("class", "chord")
		.attr("d", path)
		.attr("fill", d => color(data[d.source.index].name))
		.attr('opacity', 0.8)
		.append("title")
		.text((d,i) => {
			let source = data[d.source.index]
			let target = data[d.target.index]

			let sourceCount = source.destinations.filter(p => p.name == target.name)[0].count;
			let targetCount = target.destinations.filter(p => p.name == source.name)[0].count;

			return `${source.name} → ${target.name}: ${formatPercent(sourceCount / total)} \n${target.name} → ${source.name}: ${formatPercent(targetCount / total)}`;
		});
}

/**
 * Initialise la logique qui doit être réalisée lorsqu'un groupe du
 * diagramme est survolé par la souris.
 *
 * @param g     Le groupe SVG dans lequel le diagramme à cordes est dessiné.
 */
function initializeGroupsHovered(g) {
	g
		.selectAll('.arc')
		.on('mouseover', (d, i, nodes) => {
			g.selectAll('.chord').attr('opacity', (d2,i2) => {
				return (d2.source.index == d.index || d2.target.index == d.index) ? 0.8 : 0.1;
			})
		})
		.on('mouseout', d => {
			g.selectAll('.chord').attr('opacity', '0,8')
		})
}
