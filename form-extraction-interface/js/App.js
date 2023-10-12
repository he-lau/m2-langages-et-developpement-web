class App {
    
    constructor() {
        // URL pour récupérer les données
        this.csvUrl = "";
        this.datas = [];
        this.labels = ["HTML", "CSS", "JavaScript", "TypeScript", "PHP"];
    }

    // Convertir les données CSV en tableau
    async csvToArray() {
        try {
            // requête au sevreur pour récupèrer le fichier csv avec l'url
            const response = await fetch(this.csvUrl);
            // recuperer le contenu
            const data = await response.text();

            // parse + initialisation tableau
            const rows = data.split("\n");
            
            const dataArray = [];

            for (let i = 0; i < rows.length; i++) {
                let rowArray = rows[i].split(',');
    
                // Si c'est la première ligne (en-têtes), ajoutez-la telle quelle
                if (i === 0) {
                    
                    
                    // Supprimer le "\r" pour la dernière valeur
                    //rowArray = rowArray.map(value => value.replace(/\r/g, ''));

                    dataArray.push(rowArray);
                    rowArray[rowArray.length-1] = rowArray[rowArray.length-1].replace(/\r/g, '');
                    //console.log('DEBUG 1 : '+rowArray[rowArray.length-1].replace(/\r/g, ''));

                    rowArray.push('Total');
                } else {
                    // Convertir les éléments à partir de l'indice 3 en chiffres
                    for (let j = 3; j < rowArray.length; j++) {
                        rowArray[j] = parseInt(rowArray[j]);
                    }
                    // Calculer le total à partir de l'indice 3
                    const total = rowArray.slice(3).reduce((acc, currentValue) => acc + currentValue, 0);

                    // Ajouter le total à la fin de la ligne
                    rowArray.push(total);
                    dataArray.push(rowArray);
                }
            }

            // Trier dataArray en fonction du total (à partir de l'indice 3)
            dataArray.sort((a, b) => {
                const totalA = a[a.length - 1]; // Dernier élément de la ligne A
                const totalB = b[b.length - 1]; // Dernier élément de la ligne B

                // Trier en ordre décroissant
                return totalB - totalA;
            });

            this.datas = dataArray;
            return dataArray;
        } catch (error) {
            console.error("Erreur lors de la conversion CSV en tableau : ", error);
            return [];
        }
    }


    // Transformer l'URL Google Drive
    transformGoogleDriveUrl(originalUrl) {
        // Recherche de la chaîne "/open?id=" dans l'URL d'origine
        const position = originalUrl.indexOf("/open?id=");

        // Si la chaîne est trouvée
        if (position !== -1) {
            // Récupérer l'ID du fichier en supprimant la partie avant "/open?id="
            const fileId = originalUrl.slice(position + "/open?id=".length);

            // Construire l'URL directe avec "https://drive.google.com/uc?id="
            return `https://drive.google.com/uc?id=${fileId}`;
        }

        // Si l'URL ne contient pas "/open?id=", la retourner telle quelle
        return originalUrl;
    }

    // Setter pour l'URL CSV
    setCsvUrl(newUrl) {
        this.csvUrl = newUrl;
    }

    // Getter pour l'URL CSV
    getCsvUrl() {
        return this.csvUrl;
    }

    // Getter pour les données
    getDatas() {
        return this.datas;
    }

    



    updateSkill(datas,skillName, skillButton) {
        // Récupérer le bouton de compétence en fonction du nom de la compétence
        //const skillButton = document.querySelector(`[data-skill="${skillName}"]`);        

    
        // Récupérer tous les graphiques radar
        const radarCharts = document.querySelectorAll('.radar-chart');

        console.log(datas);
        console.log(radarCharts.length);
        console.log(skillButton);

        const thisLabels = this.labels;
        
        
        // Boucler à travers chaque graphique radar
        radarCharts.forEach(function (chart) {
            // Récupérer l'instance du graphique radar
            const radarChartInstance = Chart.getChart(chart);
            // Récupérer le jeu de données
            const dataset = radarChartInstance.data.datasets[0];
            // Récupérer les étiquettes
            const labels = radarChartInstance.data.labels;
            // Récupérer le conteneur parent
            const card = chart.parentElement;
            // Récupérer l'indice de la carte
            const cardIndex = card.querySelector('.radar-chart').getAttribute('data-card-index');
    
            const skillsTotalElement = document.getElementById(`skills-total-value-${cardIndex}`);
    
            // Vérifier si la compétence spécifiée existe dans les étiquettes
            const indexOfSkill = labels.indexOf(skillName);

            //
            const skillsTotalMax = document.getElementById(`skills-total-max-${cardIndex}`);
    
            // Toggle la compétence spécifiée
            if (indexOfSkill !== -1) {
                // La compétence existe, la supprimer
                dataset.data.splice(indexOfSkill, 1);
                labels.splice(indexOfSkill, 1);
                skillButton.classList.remove("btn-success");
                skillButton.classList.add("btn-danger");

                skillsTotalMax.textContent = parseInt(skillsTotalMax.textContent) - 5;
            } else {
                // La compétence n'existe pas, l'ajouter
                labels.push(skillName);
                //console.log('aaaaaaaaaaa');
                //console.log(thisLabels);
                // Récupérer le niveau de compétence spécifié à partir des données de l'utilisateur
                dataset.data.push(datas[cardIndex][thisLabels.indexOf(skillName)+3]);
                skillButton.classList.remove("btn-danger");
                skillButton.classList.add("btn-success");

                skillsTotalMax.textContent = parseInt(skillsTotalMax.textContent) + 5;
            }
    
            // Mettre à jour le graphique radar
            radarChartInstance.update();
    
            // Mettre à jour le total des compétences
            const newTotal = calculateSkillsTotal(dataset.data);
            skillsTotalElement.textContent = newTotal;
    
            // Mettre à jour la barre de progression
            const progressBar = card.querySelector(`#skills-progress-${cardIndex}`);
            progressBar.style.width = (newTotal * 4) + '%';
        });
    }    
}
