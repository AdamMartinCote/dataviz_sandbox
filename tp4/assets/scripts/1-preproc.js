"use strict";

/**
 * Fichier permettant de traiter les données provenant du fichier JSON.
 */


/**
 * Précise le domaine de l'échelle de couleurs qui est utilisée pour
 * distinguer chacune des stations de BIXI.
 *
 * @param color   Échelle de couleurs.
 * @param data    Données provenant du fichier JSON.
 */
function domainColor(color, data) {
  // TODO: Préciser le domaine de l'échelle de couleurs en y associant
  // les stations de BIXI utilisées.
	color.domain(data);
}

/**
 * Précise le domaine de l'échelle utilisée pour l'axe X du diagramme à bandes.
 *
 * @param x       Échelle X à utiliser.
 * @param data    Données provenant du fichier JSON.
 */
function domainX(x, data) {
  // TODO: Préciser le domaine pour la variable "x" en y associant les
  // stations de BIXI utilisées.
	let names = data.map((d) => {
		return d.name
	});
	x.domain([d3.min(names), d3.max(names)]);
}

/**
 * Précise le domaine de l'échelle utilisée pour l'axe Y du diagramme à bandes.
 *
 * @param y             Échelle Y à
 * @param currentData   Les données qui sont actuellement utilisées par le diagramme.
 */
function domainY(y, currentData) {
  // TODO: Préciser le domaine pour la variable "y" en prenant comme
  // minimum et maximum le nombre de trajets vers une station de BIXI.

	// Get all counts from data flat FIXME: remove
	// let allCounts = currentData.map((stations) => {
	// 	return stations.destinations.map((dest, i) => {
	// 		return dest.count;
	// 	});
	// }).flat();
	// console.log(currentData.destinations);
	let counts = currentData.destinations.map((d) => {
		return d.count;
	});
	y.domain([d3.min(counts), d3.max(counts)]);
}

/**
 * Obtient la matrice d'adjacence à partir des données spécifiées pour
 * créer le diagramme à cordes.
 *
 * @param data        Données provenant du fichier JSON.
 * @return {Array} 		Une matrice de 10 x 10 indiquant le nombre de
 * 										trajets partant et se dirigeant vers une station précise.
 */
function getMatrix(data) {
  // TODO: Calculer la matrice d'adjacence pour créer le diagramme à
  // cordes.
	let matrix = data.map((src) => {
		return src.destinations.map((dest) => {
			return dest.count;
		});
	})
  return matrix;
}

/**
 * Obtient le nombre total de trajets réalisés pour le mois d'août 2015.
 *
 * @param data    Données provenant du fichier JSON.
 */
function getTotal(data) {
  // TODO:	Calculer le nombre total de trajets réalisés pour le mois
  // 				d'août 2015.
  return 0;
}
