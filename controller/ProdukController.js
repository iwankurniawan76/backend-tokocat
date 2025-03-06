import Produk from "../model/ProdukModel.js";

export const getProduk = async (req, res) => {
  try {
    const response = await Produk.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
    res.json({ message: error });
  }
};

export const getBarangByKodeBarang = async (req, res) => {
  try {
    const kodeBarang = req.params.kodeBarang;
    const barang = await Produk.findOne({ where: { kode_barang: kodeBarang } });
    res.json(barang);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProdukById = async (req, res) => {
  try {
    const response = await Produk.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const bayar = async (req, res) => {
  try {
    const id = req.params.id;
    const quantity = req.body.quantity;

    const produk = await Produk.findOne({
      where: { id },
    });
    if (!produk) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    if (quantity > produk.quantity) {
      return res.status(400).json({
        message: "Transaksi dibatalkan: quantity melebihi stok tersedia",
      });
    }
    // hapus produk karna stok habis
    if (quantity === produk.quantity) {
      await produk.destroy();
      return res.json({ message: "Produk dihapus karena stok habis" });
    }
    //Kurangi stok di database
    produk.quantity -= quantity;
    await produk.save();
    return res.json({ message: "Stock barang berhasil diupdate" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const saveProduk = async (req, res, next) => {
  const tglPembelian = req.body.tglPembelian;
  const kodeBarang = req.body.kodeBarang;
  const produk = req.body.produk;
  const distributor = req.body.distributor;
  const merek = req.body.merek;
  const quantity = req.body.quantity;
  const satuan = req.body.satuan;
  const h_beli = req.body.h_beli;
  const h_jual = req.body.h_jual;
  const diskon = req.body.diskon;

  if (
    isNaN(parseInt(quantity)) ||
    isNaN(parseFloat(h_beli)) ||
    isNaN(parseFloat(h_jual)) ||
    isNaN(parseInt(diskon))
  ) {
    return res.status(400).json({
      message: "Quantity dan harga harus berupa number",
    });
  }
  const quantityNumber = parseInt(quantity);
  const h_beliNumber = parseFloat(h_beli);
  const h_jualNumber = parseFloat(h_jual);
  const diskonNumber = parseInt(diskon);

  try {
    const newProduk = await Produk.create({
      tglPembelian: tglPembelian,
      kodeBarang: kodeBarang,
      produk: produk,
      distributor: distributor,
      merek: merek,
      quantity: quantityNumber,
      satuan: satuan,
      h_beli: h_beliNumber,
      h_jual: h_jualNumber,
      diskon: diskonNumber,
    });
    return res.status(201).json(newProduk);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Gagal menyimpan data",
    });
  }
};

export const updateProduk = async (req, res, next) => {
  const editId = req.params.editId;
  const produk = req.body.produk;
  const distributor = req.body.distributor;
  const merek = req.body.merek;
  const quantity = req.body.quantity;
  const satuan = req.body.satuan;
  const h_beli = req.body.h_beli;
  const h_jual = req.body.h_jual;
  const diskon = req.body.diskon;

  const quantityNumber = parseInt(quantity);
  const h_beliNumber = parseFloat(h_beli);
  const h_jualNumber = parseFloat(h_jual);
  const diskonNumber = parseInt(diskon);

  try {
    const existingProduk = await Produk.findByPk(editId);

    if (!existingProduk) {
      return res.status(404).json({
        message: "Produk tidak ditemukan",
      });
    }

    await existingProduk.update({
      produk: produk,
      distributor: distributor,
      merek: merek,
      quantity: quantityNumber,
      satuan: satuan,
      h_beli: h_beliNumber,
      h_jual: h_jualNumber,
      diskon: diskonNumber,
    });

    res.status(200).json({
      message: "Data produk telah diupdate",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Gagal mengupdate data produk",
    });
  }
};

export const deleteProduk = async (req, res, next) => {
  const id = req.params.id;

  try {
    const produk = await Produk.findByPk(id);

    if (!produk) {
      return res.status(404).json({
        message: "Produk tidak ditemukan",
      });
    }

    await produk.destroy();

    res.status(200).json({
      message: "Data produk telah dihapus",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Gagal menghapus data produk",
    });
  }
};
