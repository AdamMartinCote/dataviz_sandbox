"use strict";

/**
 * Fichier permettant de gérer l'affichage d'un résultat de recherche.
 */


/**
 * Permet de mettre en évidence le pays qui a été sélectionné via la
 * barre de recherche.
 *
 * @param countrySelected     Le nom du pays qui a été sélectionné.
 * @param g                   Le groupe SVG dans lequel le graphique
 *                            à bulles est dessiné.
 */
function search(countrySelected, g) {
  /* TODO:
       - Mettre en évidence le pays sélectionné en coloriant le cercle
         en noir et en appliquant une opacité de 100%.
       - Appliquez une opacité de 15% aux cercles associés aux autres
         pays.
   */
	g.selectAll("circle")
		.attr("opacity", "0.15")
		.filter((d,i) => {
			return ( d.name === countrySelected );
		})
		.attr("opacity", "1.00")
		.classed("selected", true);
	;
}

/**
 * Permet de réinitialiser l'affichage à celle par défaut.
 *
 * @param g   Le groupe SVG dans lequel le graphique à bulles est
 *            dessiné.
 */
function reset(g) {
  // TODO: Réinitialiser l'affichage du nuage de points à celle par
  //       défaut.
	g.selectAll("circle")
		.attr("opacity", "1.00")
		.classed("selected", false)
	;
}
