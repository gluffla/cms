/*import { getConnection } from "./db.js";

const SQL = `
SELECT
u.last_name AS "Фамилия",
u.first_name AS "Имя",
u.username AS "Никнейм",
u.registration_date
FROM user u
WHERE u.registration_date IS NULL;
`;

async function main() {
  const conn = await getConnection();
  try {
    const [rows] = await conn.query(SQL);
    console.log("=== USERS AND THEIR PERMISSIONS ===");
    if (!rows.length) {
      console.log("No users found or query returned empty result.");
    } else {
      for (const r of rows) {
        console.log(`${r.id}: ${r.username} → ${r.permissions || "(no permissions)"}`);
      }
    }
  } catch (err) {
    console.error("Query error:", err.message);
  } finally {
    await conn.end();
  }
}

main();
*/
import { getConnection } from "./db.js";

async function main() {
  const db = await getConnection();

  const sql = `
   SELECT 
      u.username,
      GROUP_CONCAT(DISTINCT p.code ORDER BY p.code SEPARATOR ', ') AS permissions
    FROM user u
    LEFT JOIN role_has_user ru ON u.id_u = ru.user_id_u
    LEFT JOIN role r ON ru.role_id_r = r.id_r
    LEFT JOIN role_has_permission rp ON r.id_r = rp.role_id_r
    LEFT JOIN permission p ON rp.permission_id_p = p.id_p
    GROUP BY u.id_u, u.username
    ORDER BY u.username;
  `;

  try {
    const [rows] = await db.query(sql); // rows — массив объектов
   console.log("USERS AND THEIR PERMISSIONS");
rows.forEach(row => {
  console.log(`${row.username} → ${row.permissions || "(no permissions)"}`);
});

  } catch (err) {
    console.error(err);
  } finally {
    await db.end();
  }
}

main();