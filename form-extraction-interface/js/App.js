class App {
    
    constructor() {
        // URL pour récupérer les données
        this.csvUrl = "";
        this.datas = [];
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

            // injection tableau
            for (const row of rows) {
                dataArray.push(row.split(','));
            }

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
}
