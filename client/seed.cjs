const mysql = require("mysql2/promise");
const fs = require("fs");

async function uploadMeasures() {
  try {
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "D10H_!_Vtest",
    });

    // 1. On lit le fichier
    const fileContent = fs.readFileSync("./public/data/scores.json", "utf8");
    const jsonData = JSON.parse(fileContent);

    // 2. On accède à LA première partition du tableau (Michelle)
    const michelle = jsonData.scores[0];

    if (!michelle || !michelle.measures) {
      throw new Error("Impossible de trouver les mesures dans le JSON.");
    }

    // 3. On prépare le JSON string pour SQL
    const measuresString = JSON.stringify(michelle.measures);

    // 4. On met à jour la ligne "Michelle" déjà créée dans phpMyAdmin
    const [result] = await db.execute(
      "UPDATE scores SET measures = ? WHERE name = ?",
      [measuresString, "Michelle-Beatles-Chant"],
    );

    if (result.affectedRows > 0) {
      console.log("✅ Succès ! Les mesures de Michelle ont été injectées.");
    } else {
      console.log(
        "⚠️ Attention : La ligne 'Michelle' n'existe pas dans ta table SQL.",
      );
    }

    await db.end();
  } catch (error) {
    console.error("❌ Erreur :", error.message);
  }
}

uploadMeasures();
