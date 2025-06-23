// File: controllers/historyController.js
const db = require('../db')

exports.getHistory = async (req, res) => {
  const { user_id } = req.params
  try {
    // Ambil semua user_input untuk user ini
    const uiRes = await db.query(
      `SELECT id AS user_input_id, waktu_submit
       FROM user_input
       WHERE user_id = $1
       ORDER BY waktu_submit DESC`,
      [user_id]
    )
    const inputs = uiRes.rows

    // Untuk setiap input, ambil hasil_rekomendasi dan nama GOR
    const history = []
    for (const ui of inputs) {
      const hrRes = await db.query(
        `SELECT hr.id_gor, hr.skor, hr.ranking, g.nama_gor
         FROM hasil_rekomendasi hr
         JOIN gor g ON hr.id_gor = g.id_gor
         WHERE hr.user_input_id = $1
         ORDER BY hr.ranking`,
        [ui.user_input_id]
      )
      history.push({
        user_input_id: ui.user_input_id,
        waktu_submit: ui.waktu_submit,
        rekomendasi: hrRes.rows
      })
    }

    res.json({ history })
  } catch (err) {
    console.error('[history error]', err)
    res.status(500).json({ error: err.message })
  }
}
