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
	color.domain(data.map(d => d.name));
}

/**
 * Précise le domaine de l'échelle utilisée pour l'axe X du diagramme à bandes.
 *
 * @param x       Échelle X à utiliser.
 * @param data    Données provenant du fichier JSON.
 */
function domainX(x, data) {
	x.domain(data.map(d => d.name));
}

/**
 * Précise le domaine de l'échelle utilisée pour l'axe Y du diagramme à bandes.
 *
 * @param y             Échelle Y à
 * @param currentData   Les données qui sont actuellement utilisées par le diagramme.
 */
function domainY(y, currentData) {
	y.domain(d3.extent(currentData.destinations, d => d.count));
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
	return data
		.map(stations => stations.destinations.map(dest => dest.count));
}

/**
 * Obtient le nombre total de trajets réalisés pour le mois d'août 2015.
 *
 * @param data    Données provenant du fichier JSON.
 */
function getTotal(data) {
	return data
		.map(stations => stations.destinations.map(dest => dest.count))
		.flat()
		.reduce((acc,val) => {
			return acc + val;
		});
}
