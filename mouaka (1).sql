-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 13, 2024 at 11:01 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mouaka`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_users`
--

CREATE TABLE `detail_users` (
  `id` bigint UNSIGNED NOT NULL,
  `users_id` bigint UNSIGNED DEFAULT NULL,
  `nama_lengkap` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jenis_kelamin` enum('L','P') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `no_hp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alamat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `detail_users`
--

INSERT INTO `detail_users` (`id`, `users_id`, `nama_lengkap`, `jenis_kelamin`, `no_hp`, `alamat`, `foto`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 19, 'AGUNG ALDI PRASETYA', 'P', '085807290526', 'Jalan Palem Desa Bangsri 2, RT.2/RW.4, Bangsri, Nglegok ( pak eko krupuk ) , KAB. BLITAR, NGLEGOK, JAWA TIMUR, ID, 66181', 'aku.jpeg', '2023-08-31 06:20:41', '2024-04-04 15:32:08', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dokumen_moa`
--

CREATE TABLE `dokumen_moa` (
  `id` int NOT NULL,
  `nomor_mou` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nomor_moa` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `judul_moa` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tanggal_dibuat` date DEFAULT NULL,
  `tanggal_berakhir` date DEFAULT NULL,
  `file_moa` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level_moa` int DEFAULT NULL,
  `jenis_doc` int NOT NULL,
  `kategori_moa` int DEFAULT NULL,
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `relevansi_prodi` varchar(100) DEFAULT NULL,
  `kerja_sama_dengan` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `dokumen_moa`
--

INSERT INTO `dokumen_moa` (`id`, `nomor_mou`, `nomor_moa`, `judul_moa`, `tanggal_dibuat`, `tanggal_berakhir`, `file_moa`, `file_path`, `level_moa`, `jenis_doc`, `kategori_moa`, `status`, `relevansi_prodi`, `kerja_sama_dengan`, `created_at`, `updated_at`, `deleted_at`) VALUES
(20, NULL, '1605.1/AK3/KS.00.00/2023', 'PENGEMBANGAN MAHASISWA', '2023-11-15', '2024-11-15', 'Salinan_MOA_SELECTA_ASJK.pdf', '/file/2024/05/', 4, 6, 10, 'AKTIF', '1', 'PT. SELECTA', '2024-05-31 07:58:17', '2024-06-12 08:23:07', NULL),
(21, NULL, '0773/AK3/HK.07.00/2022', 'PEMENUHAN DAN PENINGKATAN SUMBER DAYA MANUSIA MELALUI TRIDHARMA PERGURUAN TINGGI', '2022-08-04', '2023-08-04', 'Salinan_MOA BERDIKARI MU.pdf', '/file/2024/05/', 4, 6, 9, 'TIDAK AKTIF', '1', 'BERDIKARI MEDIA UTAMA', '2024-05-31 08:07:20', '2024-06-12 08:33:49', NULL),
(23, NULL, '931/AK3/07.00/2022', 'CV AGRO UTAMA MANDIRI LESTARI', '2022-09-06', '2024-09-06', 'Salinan_MoA Agro Utama Mandiri.pdf', '/file/2024/05/', 4, 6, 5, 'AKTIF', '2', 'PELAKSANAAN TRIDHARMA PERGURUAN TINGGI MELALUI PROGRAM MATCHING FUND', '2024-05-31 08:07:20', '2024-06-12 08:33:38', NULL),
(24, 'T/1/AK3/HM.01/2020', 'T/4/AK3/HM.01/2020', 'PENGEMBANGAN SUMBER DAYA MANUSIA BIDANG MULTIMEDIA DAN ADMINISTRASI PERKANTORAN', '2024-07-09', '2024-07-09', 'Salinan_MoA AKB - Matahati.pdf', '/file/2024/06/', 6, 6, 6, 'AKTIF', '[\"3\",\"4\"]', 'MATAHATI CREATIVE', '2024-06-12 07:45:51', '2024-06-13 03:03:10', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dokumen_mou`
--

CREATE TABLE `dokumen_mou` (
  `id` int NOT NULL,
  `nomor_mou` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `judul_mou` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jenis_doc` int NOT NULL,
  `tanggal_dibuat` date DEFAULT NULL,
  `tanggal_berakhir` date DEFAULT NULL,
  `file_mou` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `level_mou` int DEFAULT NULL,
  `kategori_mou` int DEFAULT NULL,
  `relevansi_prodi` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `kerja_sama_dengan` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `dokumen_mou`
--

INSERT INTO `dokumen_mou` (`id`, `nomor_mou`, `judul_mou`, `jenis_doc`, `tanggal_dibuat`, `tanggal_berakhir`, `file_mou`, `file_path`, `level_mou`, `kategori_mou`, `relevansi_prodi`, `status`, `kerja_sama_dengan`, `created_at`, `updated_at`, `deleted_at`) VALUES
(16, '0265/AK3/HK.07.00/2022', 'TRI DHARMA PERGURUAN TINGGI', 5, '2022-03-22', '2024-03-22', 'Salinan_MOU Maestria.pdf', '/file/2024/05/', 4, 5, NULL, 'TIDAK AKTIF', 'MAESTRIA (AFILIASI ALABELA PASSIONPRENEUR)', '2024-05-31 06:43:55', '2024-06-05 09:04:33', NULL),
(17, '0904.1/AK3/HK.07.00/2022', 'PENINGKATAN KUALITAS SUMBER DAYA MANUSIA MELALUI TRI DHARMA PERGURUAN TINGGI', 5, '2022-08-30', '2024-08-30', 'Salinan_MoU SMKN 1 Blitar.pdf', '/file/2024/05/', 4, 6, NULL, 'AKTIF', 'SMK NEGERI 1 BLITAR', '2024-05-31 06:57:53', '2024-05-31 06:57:53', NULL),
(18, '0391/AK3/HK.07.00/2022', 'PENINGKATAN PEMBANGUNAN DI KOTA BLITAR MELALUI TRIDHARMA PERGURUAN TINGGI AKADEMI KOMUNITAS NEGERI PUTRA SANG FAJAR BLITAR', 5, '2022-04-28', '2024-04-28', 'Salinan_MoU Pemkot Blitar.pdf', '/file/2024/05/', 4, 4, NULL, 'TIDAK AKTIF', 'PEMERINTAHAN KOTA BLITAR', '2024-05-31 07:01:45', '2024-06-05 09:04:33', NULL),
(19, '0062/AK3/HK.07.00/2022', 'PENDIDIKAN, PENELITAN, PENGABDIAN KEPADA MASYARAKAT DAN PENINGKATAN KUALITAS SUMBER DAYA MANUSIA', 5, '2022-02-19', '2023-02-19', 'Salinan_MoU STIMATA.pdf', '/file/2024/05/', 4, 8, NULL, 'TIDAK AKTIF', 'STMIK PPKIA PRADNYA PARAMITA', '2024-05-31 07:14:48', '2024-06-05 09:04:33', NULL),
(20, 'test123', 'PELAKSANAAN TRIDHARMA PERGURUAN TINGGI', 5, '2024-06-24', '2023-06-24', 'Salinan_MoU AKB - Koperasi Olahan Pangan Sejahtera 2.pdf', '/file/2024/05/', 4, 8, '[\"1\",\"2\",\"3\"]', 'TIDAK AKTIF', 'KOPERASI OLAHAN PANGAN SEJAHTERA', '2024-05-31 07:18:50', '2024-06-13 00:14:49', NULL),
(21, 'T/22/AK3/HK.07.00/2021', 'PELAKSANAAN TRIDHARMA PERGURUAN TINGGI', 5, '2021-06-17', '2026-06-17', 'Salinan_MoU AKB - Cahaya Holiday.pdf', '/file/2024/05/', 4, 8, NULL, 'AKTIF', 'PO. CAHAYA HOLIDAY', '2024-05-31 07:26:39', '2024-06-12 07:28:51', NULL),
(22, 'T/1/AK3/HM.01/2020', 'PENGEMBANGAN SUMBER DAYA MANUSIA DI BIDANG MULTIMEDIA DAN ADMINISTRASI PERKANTORAN', 5, '2020-07-09', '2024-07-09', 'Salinan_MoU AKB - Matahati.pdf', '/file/2024/06/', 4, 8, '4', 'AKTIF', 'MATAHATI CREATIVE', '2024-06-12 07:41:29', '2024-06-12 07:41:29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `jenis_doc`
--

CREATE TABLE `jenis_doc` (
  `id` int NOT NULL,
  `nama_jenis` varchar(255) DEFAULT NULL,
  `keterangan` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jenis_doc`
--

INSERT INTO `jenis_doc` (`id`, `nama_jenis`, `keterangan`, `created_at`, `updated_at`) VALUES
(5, 'Momerandum Of Understanding (MOU)', '<p><br></p>', '2024-01-24 04:32:27', '2024-01-24 04:32:27'),
(6, 'Memorandum of Agreement ( MOA)', '<p><br></p>', '2024-01-24 04:32:51', '2024-01-24 04:32:51');

-- --------------------------------------------------------

--
-- Table structure for table `kategori_doc`
--

CREATE TABLE `kategori_doc` (
  `id` bigint UNSIGNED NOT NULL,
  `nama_kategori` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keterangan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kategori_doc`
--

INSERT INTO `kategori_doc` (`id`, `nama_kategori`, `keterangan`, `created_at`, `updated_at`, `deleted_at`) VALUES
(4, 'Pemerintah', '<p><br></p>', '2024-01-24 04:08:39', '2024-01-24 04:08:39', NULL),
(5, 'Perguruan Tinggi (PT)', '<p><br></p>', '2024-01-24 04:09:01', '2024-01-24 04:09:01', NULL),
(6, 'Sekolah', '<p><br></p>', '2024-01-24 04:09:14', '2024-01-24 04:09:14', NULL),
(7, 'Dunia Usaha', '<p><br></p>', '2024-01-24 04:09:20', '2024-01-24 04:09:20', NULL),
(8, 'Industri UMKM', '<p><br></p>', '2024-01-24 04:09:38', '2024-01-24 04:09:38', NULL),
(9, 'Lembaga Pelatihan', '<p><br></p>', '2024-01-24 04:09:48', '2024-01-24 04:09:48', NULL),
(10, 'Sertifikasi', '<p><br></p>', '2024-01-24 04:09:56', '2024-01-24 04:09:56', NULL),
(11, 'Keuangan', '<p><br></p>', '2024-01-24 04:10:02', '2024-01-24 04:10:02', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `kegiatan`
--

CREATE TABLE `kegiatan` (
  `id` int NOT NULL,
  `nomor_mou` varchar(100) DEFAULT NULL,
  `nomor_moa` varchar(100) DEFAULT NULL,
  `instansi` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kegiatan` text,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kegiatan`
--

INSERT INTO `kegiatan` (`id`, `nomor_mou`, `nomor_moa`, `instansi`, `kegiatan`, `created_at`, `updated_at`, `deleted_at`) VALUES
(15, 'T/1/AK3/HM.01/2020', '[\"T\\/4\\/AK3\\/HM.01\\/2020\"]', 'MATAHATI CREATIVE', '<p>asdasdasda</p>', '2024-06-12 21:05:19', '2024-06-12 21:05:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `lampiran_kegiatan`
--

CREATE TABLE `lampiran_kegiatan` (
  `id` int NOT NULL,
  `kegiatan_id` int DEFAULT NULL,
  `file` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keterangan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lampiran_kegiatan`
--

INSERT INTO `lampiran_kegiatan` (`id`, `kegiatan_id`, `file`, `file_path`, `keterangan`, `created_at`, `updated_at`, `deleted_at`) VALUES
(10, 14, '7cbdbe51323dd3bf31360e9fa8687a2e (1).png', '/lampiran/2024/06/', 'asdfasd', '2024-06-12 07:57:10', '2024-06-12 07:57:10', NULL),
(11, 15, 'WhatsApp Image 2024-06-07 at 13.17.45_159ca06d.jpg', '/lampiran/2024/06/', '1234567', '2024-06-12 21:05:19', '2024-06-12 21:13:08', NULL),
(12, 15, '7cbdbe51323dd3bf31360e9fa8687a2e.png', '/lampiran/2024/06/', 'asdasdasd', '2024-06-12 21:05:19', '2024-06-12 21:05:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `leveling_doc`
--

CREATE TABLE `leveling_doc` (
  `id` bigint UNSIGNED NOT NULL,
  `nama_level` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keterangan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `leveling_doc`
--

INSERT INTO `leveling_doc` (`id`, `nama_level`, `keterangan`, `created_at`, `updated_at`, `deleted_at`) VALUES
(4, 'Lokal / Regional', '<p><br></p>', '2024-01-24 05:35:19', '2024-01-24 05:35:19', NULL),
(6, 'Nasional', '<p><br></p>', '2024-01-24 05:38:01', '2024-01-24 05:38:01', NULL),
(7, 'Internasional', '<p><br></p>', '2024-01-24 05:40:08', '2024-01-25 06:02:53', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `log_user`
--

CREATE TABLE `log_user` (
  `id` int NOT NULL,
  `id_users` int DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `nama_username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `log_user`
--

INSERT INTO `log_user` (`id`, `id_users`, `content`, `nama_username`, `ip`, `action`, `created_at`, `updated_at`, `deleted_at`) VALUES
(180, 19, '{\"id\":null,\"nama_template\":\"Template 1 MOU\",\"tipe_file\":\"docx\",\"jenis_doc_id\":\"5\",\"keterangan\":\"<p><br><\\/p>\",\"file\":\"Doc1 (1).docx\",\"dokumen_path\":\"\\/file\\/2024\\/04\\/\"}', 'AGUNG ALDI', '::1', 'TAMBAH MASTER TEMPLATE DOKUMEN', '2024-04-05 08:00:33', NULL, NULL),
(181, 19, '{\"id\":null,\"nomor_mou\":\"3505091234563\",\"tanggal_dibuat\":\"2024-04-01\",\"tanggal_berakhir\":\"2024-04-30\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"UNISBA Blitar\",\"jenis_doc\":\"5\",\"kategori_mou\":\"5\",\"level_mou\":\"4\",\"relevansi_prodi\":\"1\",\"file_mou\":\"ijazah D2.pdf\",\"file_path\":\"\\/file\\/2024\\/04\\/\"}', 'AGUNG ALDI', '::1', 'TAMBAH MASTER DOCUMENT', '2024-04-05 08:04:11', NULL, NULL),
(182, 19, '[{\"id\":null,\"nomor_mou\":\"3505091234563 - UNISBA Blitar\",\"nomor_moa\":\"3505091234567890\",\"tanggal_dibuat\":\"2024-04-01\",\"tanggal_berakhir\":\"2024-04-30\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"UNISBA\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"5 - Perguruan Tinggi (PT)\",\"level_moa\":\"4 - Lokal \\/ Regional\",\"relevansi_prodi\":\"1 - Administrasi Server Dan Jaringan Komputer\",\"file_moa\":\"Transkrip Nilai AKN.pdf\",\"file_path\":\"\\/file\\/2024\\/04\\/\"}]', 'AGUNG ALDI', '::1', 'TAMBAH DOKUMEN MOA', '2024-04-05 08:05:38', NULL, NULL),
(183, 19, '[{\"id\":\"13\",\"nomor_mou\":\"3505091234563 - UNISBA Blitar\",\"nomor_moa\":\"3505091234567890\",\"tanggal_dibuat\":\"2024-04-01\",\"tanggal_berakhir\":\"2024-04-30\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"UNISBA\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"5 - Perguruan Tinggi (PT)\",\"level_moa\":\"4 - Lokal \\/ Regional\",\"relevansi_prodi\":\"1 - Administrasi Server Dan Jaringan Komputer\",\"file_moa\":null,\"file_path\":null},{\"id\":null,\"nomor_mou\":\"3505091234563 - UNISBA Blitar\",\"nomor_moa\":\"12453\",\"tanggal_dibuat\":\"2024-04-01\",\"tanggal_berakhir\":\"2024-04-30\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"UNISBA\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"5 - Perguruan Tinggi (PT)\",\"level_moa\":\"4 - Lokal \\/ Regional\",\"relevansi_prodi\":\"4 - Administrasi Perkantoran\",\"file_moa\":\"ijazah D2.pdf\",\"file_path\":\"\\/file\\/2024\\/04\\/\"}]', 'AGUNG ALDI', '::1', 'TAMBAH DOKUMEN MOA', '2024-04-05 08:30:04', NULL, NULL),
(184, 19, '[{\"id\":null,\"nomor_mou\":\"3505091234563 - UNISBA Blitar\",\"nomor_moa\":\"a:2:{i:0;s:5:\\\"12453\\\";i:1;s:16:\\\"3505091234567890\\\";}\",\"kegiatan\":\"<p>Test Isi Kegiatan<\\/p>\"}]', 'AGUNG ALDI', '::1', 'TAMBAH KEGIATAN', '2024-04-05 08:33:27', NULL, NULL),
(185, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-OCN87J3\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-04-24 02:27:17', NULL, NULL),
(186, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-OCN87J3\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-04-26 01:48:50', NULL, NULL),
(187, 19, '{\"id\":null,\"nomor_mou\":\"61876187\",\"tanggal_dibuat\":\"2024-04-26\",\"tanggal_berakhir\":\"2024-04-30\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"test\",\"jenis_doc\":\"5\",\"kategori_mou\":\"5\",\"level_mou\":\"4\",\"relevansi_prodi\":\"1\",\"file_mou\":\"Transkrip Nilai AKN.pdf\",\"file_path\":\"\\/file\\/2024\\/04\\/\"}', 'AGUNG ALDI', '::1', 'TAMBAH MASTER DOCUMENT', '2024-04-26 01:54:52', NULL, NULL),
(188, 19, '{\"data\":{\"id\":\"13\",\"nomor_mou\":\"61876187\",\"tanggal_dibuat\":\"2024-04-21\",\"tanggal_berakhir\":\"2024-04-25\",\"jenis\":\"5\",\"kategori\":\"5\",\"level\":\"4\",\"status\":\"AKTIF\",\"relevansi_prodi\":\"1\",\"kerja_sama_dengan\":\"test\",\"file_name\":\"61876187 - test\"},\"user_id\":\"19\"}', 'AGUNG ALDI', '::1', 'UPDATE MASTER DOCUMENT', '2024-04-26 01:57:45', NULL, NULL),
(189, NULL, '[{\"nomor_dokumen\":\"61876187\",\"tanggal_berakhir\":\"2024-04-24T17:00:00.000Z\"}]', 'scheduller', NULL, 'UPDATE STATUS MOU ', '2024-04-26 01:59:02', NULL, NULL),
(190, 19, '[{\"id\":\"13\",\"nomor_mou\":\"3505091234563 - UNISBA Blitar\",\"nomor_moa\":\"3505091234567890\",\"tanggal_dibuat\":\"2024-04-01\",\"tanggal_berakhir\":\"2024-04-30\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"UNISBA\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"5 - Perguruan Tinggi (PT)\",\"level_moa\":\"4 - Lokal \\/ Regional\",\"relevansi_prodi\":\"1 - Administrasi Server Dan Jaringan Komputer\",\"file_moa\":null,\"file_path\":null},{\"id\":\"14\",\"nomor_mou\":\"3505091234563 - UNISBA Blitar\",\"nomor_moa\":\"12453\",\"tanggal_dibuat\":\"2024-04-01\",\"tanggal_berakhir\":\"2024-04-30\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"UNISBA\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"5 - Perguruan Tinggi (PT)\",\"level_moa\":\"4 - Lokal \\/ Regional\",\"relevansi_prodi\":\"4 - Administrasi Perkantoran\",\"file_moa\":null,\"file_path\":null},{\"id\":null,\"nomor_mou\":\"3505091234563 - UNISBA Blitar\",\"nomor_moa\":\"12453\",\"tanggal_dibuat\":\"2024-04-25\",\"tanggal_berakhir\":\"2024-04-26\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"UNISBA\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"4 - Pemerintah\",\"level_moa\":\"4 - Lokal \\/ Regional\",\"relevansi_prodi\":\"2 - Penyutingan Audio Video\",\"file_moa\":\"Transkrip Nilai AKN.pdf\",\"file_path\":\"\\/file\\/2024\\/04\\/\"}]', 'AGUNG ALDI', '::1', 'TAMBAH DOKUMEN MOA', '2024-04-26 02:00:32', NULL, NULL),
(191, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-OCN87J3\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGOUT', '2024-04-26 02:04:39', NULL, NULL),
(192, 20, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-OCN87J3\"}', 'asjk | ', '::1', 'LOGIN', '2024-04-26 02:04:44', NULL, NULL),
(193, 20, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-OCN87J3\"}', 'asjk | ', '::1', 'LOGOUT', '2024-04-26 02:06:43', NULL, NULL),
(194, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-OCN87J3\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-04-26 02:06:48', NULL, NULL),
(195, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-OCN87J3\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-04-26 07:13:00', NULL, NULL),
(196, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-OCN87J3\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-04-27 02:43:25', NULL, NULL),
(197, 19, '{\"id\":\"15\",\"nomor_mou\":\"3505091234563\",\"nomor_moa\":\"12453\",\"tanggal_dibuat\":\"2024-04-25\",\"tanggal_berakhir\":\"2024-04-26\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"AKN PACITAN\",\"jenis_doc\":\"6\",\"kategori_moa\":\"4\",\"level_moa\":\"4\",\"relevansi_prodi\":\"2\",\"file_moa\":\"\",\"file_path\":\"\"}', 'AGUNG ALDI', '::1', 'UPDATE DOKUMEN MOA', '2024-04-27 03:08:08', NULL, NULL),
(198, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-OCN87J3\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGOUT', '2024-04-27 03:14:54', NULL, NULL),
(199, 20, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-OCN87J3\"}', 'asjk | ', '::1', 'LOGIN', '2024-04-27 03:14:58', NULL, NULL),
(200, 20, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-OCN87J3\"}', 'asjk | ', '::1', 'LOGOUT', '2024-04-27 03:30:59', NULL, NULL),
(201, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-OCN87J3\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-04-27 03:31:04', NULL, NULL),
(202, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-OCN87J3\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-04-30 03:14:07', NULL, NULL),
(203, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-05-01 16:58:58', NULL, NULL),
(204, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-05-03 07:09:40', NULL, NULL),
(205, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGOUT', '2024-05-03 07:09:53', NULL, NULL),
(206, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-05-03 08:00:43', NULL, NULL),
(207, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-05-04 04:49:10', NULL, NULL),
(208, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGOUT', '2024-05-04 05:40:50', NULL, NULL),
(209, 21, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'pengurus kerjasama | ', '::1', 'LOGIN', '2024-05-04 05:40:54', NULL, NULL),
(210, 21, '{\"id\":null,\"nomor_mou\":\"0912356343\",\"tanggal_dibuat\":\"2024-05-04\",\"tanggal_berakhir\":\"2024-05-05\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"AKN PROBOLINGGO\",\"jenis_doc\":\"5\",\"kategori_mou\":\"5\",\"level_mou\":\"4\",\"relevansi_prodi\":\"1\",\"file_mou\":\"Daftar Ulang PENS.pdf\",\"file_path\":\"\\/file\\/2024\\/05\\/\"}', 'pengurus kerjasama', '::1', 'TAMBAH MASTER DOCUMENT', '2024-05-04 05:57:25', NULL, NULL),
(211, 21, '[{\"id\":null,\"nomor_mou\":\"0912356343 - AKN PROBOLINGGO\",\"nomor_moa\":\"111133\",\"judul_moa\":\"Test Judul MOA\",\"tanggal_dibuat\":\"2024-05-04\",\"tanggal_berakhir\":\"2024-05-06\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"AKN PROBOLINGGO\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"5 - Perguruan Tinggi (PT)\",\"level_moa\":\"4 - Lokal \\/ Regional\",\"relevansi_prodi\":\"1 - Administrasi Server Dan Jaringan Komputer\",\"file_moa\":\"Copy of Rapat Prodi PJJ TI.pdf\",\"file_path\":\"\\/file\\/2024\\/05\\/\"}]', 'pengurus kerjasama', '::1', 'TAMBAH DOKUMEN MOA', '2024-05-04 06:12:20', NULL, NULL),
(212, 21, '{\"id\":\"16\",\"nomor_mou\":\"0912356343\",\"nomor_moa\":\"111133\",\"tanggal_dibuat\":\"2024-05-04\",\"tanggal_berakhir\":\"2024-05-06\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"AKN PROBOLINGGO\",\"jenis_doc\":\"6\",\"kategori_moa\":\"5\",\"level_moa\":\"4\",\"relevansi_prodi\":\"1\",\"file_moa\":\"\",\"file_path\":\"\"}', 'pengurus kerjasama', '::1', 'UPDATE DOKUMEN MOA', '2024-05-04 06:15:22', NULL, NULL),
(213, 21, '{\"id\":\"16\",\"nomor_mou\":\"0912356343\",\"nomor_moa\":\"111133\",\"tanggal_dibuat\":\"2024-05-04\",\"tanggal_berakhir\":\"2024-05-06\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"AKN PROBOLINGGO\",\"jenis_doc\":\"6\",\"kategori_moa\":\"5\",\"level_moa\":\"4\",\"relevansi_prodi\":\"1\",\"file_moa\":\"\",\"file_path\":\"\"}', 'pengurus kerjasama', '::1', 'UPDATE DOKUMEN MOA', '2024-05-04 06:15:37', NULL, NULL),
(214, 21, '{\"id\":\"16\",\"nomor_mou\":\"0912356343\",\"nomor_moa\":\"111133\",\"tanggal_dibuat\":\"2024-05-04\",\"tanggal_berakhir\":\"2024-05-06\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"AKN PROBOLINGGO\",\"jenis_doc\":\"6\",\"kategori_moa\":\"5\",\"level_moa\":\"4\",\"relevansi_prodi\":\"1\",\"file_moa\":\"\",\"file_path\":\"\"}', 'pengurus kerjasama', '::1', 'UPDATE DOKUMEN MOA', '2024-05-04 06:16:52', NULL, NULL),
(215, 21, '[{\"id\":\"13\",\"nomor_mou\":\"3505091234563 - UNISBA Blitar\",\"nomor_moa\":\"a:3:{i:0;s:16:\\\"3505091234567890\\\";i:1;s:5:\\\"12453\\\";i:2;s:5:\\\"12453\\\";}\",\"kegiatan\":\"<p>Test Isi Kegiatan<\\/p>\"}]', 'pengurus kerjasama', '::1', 'TAMBAH KEGIATAN', '2024-05-04 06:37:28', NULL, NULL),
(216, 21, '[{\"id\":\"13\",\"nomor_mou\":\"3505091234563 - UNISBA Blitar\",\"nomor_moa\":\"a:3:{i:0;s:16:\\\"3505091234567890\\\";i:1;s:5:\\\"12453\\\";i:2;s:5:\\\"12453\\\";}\",\"kegiatan\":\"<p>Test Isi Kegiatan<\\/p>\"}]', 'pengurus kerjasama', '::1', 'TAMBAH KEGIATAN', '2024-05-04 06:56:28', NULL, NULL),
(217, 21, '[{\"id\":\"13\",\"nomor_mou\":\"3505091234563 - UNISBA Blitar\",\"nomor_moa\":\"a:3:{i:0;s:16:\\\"3505091234567890\\\";i:1;s:5:\\\"12453\\\";i:2;s:5:\\\"12453\\\";}\",\"kegiatan\":\"<p>Test Isi Kegiatan<\\/p>\"}]', 'pengurus kerjasama', '::1', 'TAMBAH KEGIATAN', '2024-05-04 07:03:56', NULL, NULL),
(218, 21, '[{\"id\":\"13\",\"nomor_mou\":\"3505091234563 - UNISBA Blitar\",\"nomor_moa\":\"a:3:{i:0;s:16:\\\"3505091234567890\\\";i:1;s:5:\\\"12453\\\";i:2;s:5:\\\"12453\\\";}\",\"kegiatan\":\"<p>Test Isi Kegiatan<\\/p>\"}]', 'pengurus kerjasama', '::1', 'TAMBAH KEGIATAN', '2024-05-04 07:29:03', NULL, NULL),
(219, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-05-06 04:44:43', NULL, NULL),
(220, 19, '{\"id\":\"16\",\"user_id\":\"19\"}', 'AGUNG ALDI', '::1', 'DELETE DOKUMEN MOA', '2024-05-06 05:01:03', NULL, NULL),
(221, 19, '[{\"id\":null,\"nomor_mou\":\"0912356343 - AKN PROBOLINGGO\",\"nomor_moa\":\"24234234\",\"judul_moa\":\"Test Judul MOA2\",\"tanggal_dibuat\":\"2024-05-06\",\"tanggal_berakhir\":\"2024-05-31\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"234234\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"4 - Pemerintah\",\"level_moa\":\"4 - Lokal \\/ Regional\",\"relevansi_prodi\":\"1 - Administrasi Server Dan Jaringan Komputer\",\"file_moa\":\"cobaMOA.pdf\",\"file_path\":\"\\/file\\/2024\\/05\\/\"}]', 'AGUNG ALDI', '::1', 'TAMBAH DOKUMEN MOA', '2024-05-06 05:02:05', NULL, NULL),
(222, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-05-06 10:35:00', NULL, NULL),
(223, 19, '[{\"id\":\"17\",\"nomor_mou\":\"0912356343 - AKN PROBOLINGGO\",\"nomor_moa\":\"24234234\",\"judul_moa\":\"Test Judul MOA2\",\"tanggal_dibuat\":\"2024-05-06\",\"tanggal_berakhir\":\"2024-05-31\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"234234\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"4 - Pemerintah\",\"level_moa\":\"4 - Lokal \\/ Regional\",\"relevansi_prodi\":\"1 - Administrasi Server Dan Jaringan Komputer\",\"file_moa\":null,\"file_path\":null},{\"id\":null,\"nomor_mou\":\"0912356343 - AKN PROBOLINGGO\",\"nomor_moa\":\"12347652341412\",\"judul_moa\":\"laksjdhnjkalsdn\",\"tanggal_dibuat\":\"2024-05-06\",\"tanggal_berakhir\":\"2024-05-31\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"lkjdshajkldshkl\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"5 - Perguruan Tinggi (PT)\",\"level_moa\":\"4 - Lokal \\/ Regional\",\"relevansi_prodi\":\"1 - Administrasi Server Dan Jaringan Komputer\",\"file_moa\":\"cobaMOA.pdf\",\"file_path\":\"\\/file\\/2024\\/05\\/\"}]', 'AGUNG ALDI', '::1', 'TAMBAH DOKUMEN MOA', '2024-05-06 10:37:47', NULL, NULL),
(224, 19, '{\"id\":null,\"nomor_mou\":\"61876187\",\"tanggal_dibuat\":\"2024-05-06\",\"tanggal_berakhir\":\"2024-05-31\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"AKN PACITAN\",\"jenis_doc\":\"5\",\"kategori_mou\":\"5\",\"level_mou\":\"4\",\"relevansi_prodi\":\"1\",\"file_mou\":\"cobaMOU.pdf\",\"file_path\":\"\\/file\\/2024\\/05\\/\"}', 'AGUNG ALDI', '::1', 'TAMBAH MASTER DOCUMENT', '2024-05-06 11:15:03', NULL, NULL),
(225, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-05-11 08:29:34', NULL, NULL),
(226, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-05-16 05:19:48', NULL, NULL),
(227, 19, '[{\"id\":null,\"nomor_mou\":\"61876187 - AKN PACITAN\",\"nomor_moa\":\"0012353201\",\"judul_moa\":\"Test Judulku\",\"tanggal_dibuat\":\"2024-05-16\",\"tanggal_berakhir\":\"2024-05-31\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"AKN LAMONGAN\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"5 - Perguruan Tinggi (PT)\",\"level_moa\":\"4 - Lokal \\/ Regional\",\"relevansi_prodi\":\"1 - Administrasi Server Dan Jaringan Komputer\",\"file_moa\":\"peakpx.jpg\",\"file_path\":\"\\/file\\/2024\\/05\\/\"}]', 'AGUNG ALDI', '::1', 'TAMBAH DOKUMEN MOA', '2024-05-16 05:20:39', NULL, NULL),
(228, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-05-17 04:08:16', NULL, NULL),
(229, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGOUT', '2024-05-17 04:08:24', NULL, NULL),
(230, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-05-17 04:17:03', NULL, NULL),
(231, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-05-31 06:10:13', NULL, NULL),
(232, 19, '{\"id\":\"15\",\"user_id\":\"19\"}', 'AGUNG ALDI', '::1', 'DELETE MASTER TEMPLATE DOKUMEN', '2024-05-31 06:11:56', NULL, NULL),
(233, 19, '{\"id\":\"15\",\"user_id\":\"19\"}', 'AGUNG ALDI', '::1', 'DELETE MASTER DOCUMENT', '2024-05-31 06:15:48', NULL, NULL),
(234, 19, '{\"id\":\"19\",\"nomor_mou\":null,\"nomor_moa\":\"0012353201\",\"tanggal_dibuat\":\"2024-05-16\",\"tanggal_berakhir\":\"2024-05-31\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"AKN LAMONGAN\",\"jenis_doc\":\"6\",\"kategori_moa\":\"5\",\"level_moa\":\"4\",\"relevansi_prodi\":\"1\",\"file_moa\":\"\",\"file_path\":\"\"}', 'AGUNG ALDI', '::1', 'UPDATE DOKUMEN MOA', '2024-05-31 06:29:26', NULL, NULL),
(235, 19, '{\"id\":\"19\",\"nomor_mou\":null,\"nomor_moa\":\"0012353201\",\"tanggal_dibuat\":\"2024-05-16\",\"tanggal_berakhir\":\"2024-05-31\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"AKN LAMONGAN\",\"jenis_doc\":\"6\",\"kategori_moa\":\"5\",\"level_moa\":\"4\",\"relevansi_prodi\":\"1\",\"file_moa\":\"\",\"file_path\":\"\"}', 'AGUNG ALDI', '::1', 'UPDATE DOKUMEN MOA', '2024-05-31 06:36:28', NULL, NULL),
(236, 19, '{\"id\":\"19\",\"nomor_mou\":null,\"nomor_moa\":\"0012353201\",\"tanggal_dibuat\":\"2024-05-16\",\"tanggal_berakhir\":\"2024-05-31\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"AKN LAMONGAN\",\"jenis_doc\":\"6\",\"kategori_moa\":\"5\",\"level_moa\":\"4\",\"relevansi_prodi\":\"1\",\"file_moa\":\"\",\"file_path\":\"\"}', 'AGUNG ALDI', '::1', 'UPDATE DOKUMEN MOA', '2024-05-31 06:37:04', NULL, NULL),
(237, 19, '{\"id\":\"19\",\"user_id\":\"19\"}', 'AGUNG ALDI', '::1', 'DELETE DOKUMEN MOA', '2024-05-31 06:37:24', NULL, NULL),
(238, 19, '{\"id\":null,\"nomor_mou\":\"0265\\/AK3\\/HK.07.00\\/2022\",\"tanggal_dibuat\":\"2022-03-22\",\"tanggal_berakhir\":\"2024-03-22\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"MAESTRIA (AFILIASI ALABELA PASSIONPRENEUR)\",\"jenis_doc\":\"5\",\"kategori_mou\":\"5\",\"level_mou\":\"4\",\"relevansi_prodi\":\"1\",\"file_mou\":\"Salinan_MOU Maestria.pdf\",\"file_path\":\"\\/file\\/2024\\/05\\/\"}', 'AGUNG ALDI', '::1', 'TAMBAH MASTER DOCUMENT', '2024-05-31 06:43:55', NULL, NULL),
(239, 19, '{\"data\":{\"id\":\"16\",\"nomor_mou\":\"0265\\/AK3\\/HK.07.00\\/2022\",\"judul_mou\":\"TRI DHARMA PERGURUAN TINGGI\",\"tanggal_dibuat\":\"2022-03-22\",\"tanggal_berakhir\":\"2024-03-22\",\"jenis\":\"5\",\"kategori\":\"5\",\"level\":\"4\",\"status\":\"AKTIF\",\"relevansi_prodi\":null,\"kerja_sama_dengan\":\"MAESTRIA (AFILIASI ALABELA PASSIONPRENEUR)\",\"file_name\":\"0265\\/AK3\\/HK.07.00\\/2022 - MAESTRIA (AFILIASI ALABELA PASSIONPRENEUR)\"},\"user_id\":\"19\"}', 'AGUNG ALDI', '::1', 'UPDATE MASTER DOCUMENT', '2024-05-31 06:45:55', NULL, NULL),
(240, 19, '{\"id\":null,\"nomor_mou\":\"0904.1\\/AK3\\/HK.07.00\\/2022\",\"tanggal_dibuat\":\"2022-08-30\",\"tanggal_berakhir\":\"2024-08-30\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"SMK NEGERI 1 BLITAR\",\"jenis_doc\":\"5\",\"kategori_mou\":\"6\",\"level_mou\":\"4\",\"relevansi_prodi\":null,\"file_mou\":\"Salinan_MoU SMKN 1 Blitar.pdf\",\"file_path\":\"\\/file\\/2024\\/05\\/\"}', 'AGUNG ALDI', '::1', 'TAMBAH MASTER DOCUMENT', '2024-05-31 06:57:53', NULL, NULL),
(241, 19, '{\"id\":null,\"nomor_mou\":\"0391\\/AK3\\/HK.07.00\\/2022\",\"tanggal_dibuat\":\"2022-04-28\",\"tanggal_berakhir\":\"2024-04-28\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"PEMERINTAHAN KOTA BLITAR\",\"jenis_doc\":\"5\",\"kategori_mou\":\"4\",\"level_mou\":\"4\",\"relevansi_prodi\":null,\"file_mou\":\"Salinan_MoU Pemkot Blitar.pdf\",\"file_path\":\"\\/file\\/2024\\/05\\/\"}', 'AGUNG ALDI', '::1', 'TAMBAH MASTER DOCUMENT', '2024-05-31 07:01:45', NULL, NULL),
(242, 19, '{\"id\":null,\"nomor_mou\":\"0062\\/AK3\\/HK.07.00\\/2022\",\"tanggal_dibuat\":\"2022-02-19\",\"tanggal_berakhir\":\"2023-02-19\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"STMIK PPKIA PRADNYA PARAMITA\",\"jenis_doc\":\"5\",\"kategori_mou\":\"8\",\"level_mou\":\"4\",\"relevansi_prodi\":null,\"file_mou\":\"Salinan_MoU STIMATA.pdf\",\"file_path\":\"\\/file\\/2024\\/05\\/\"}', 'AGUNG ALDI', '::1', 'TAMBAH MASTER DOCUMENT', '2024-05-31 07:14:48', NULL, NULL),
(243, 19, '{\"id\":null,\"nomor_mou\":\"T\\/29\\/AK3\\/07.00\\/2021\",\"tanggal_dibuat\":\"2024-06-24\",\"tanggal_berakhir\":\"2023-06-24\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"KOPERASI OLAHAN PANGAN SEJAHTERA\",\"jenis_doc\":\"5\",\"kategori_mou\":\"8\",\"level_mou\":\"4\",\"relevansi_prodi\":\"3\",\"file_mou\":\"Salinan_MoU AKB - Koperasi Olahan Pangan Sejahtera 2.pdf\",\"file_path\":\"\\/file\\/2024\\/05\\/\"}', 'AGUNG ALDI', '::1', 'TAMBAH MASTER DOCUMENT', '2024-05-31 07:18:51', NULL, NULL),
(244, 19, '{\"id\":null,\"nomor_mou\":\"T\\/22\\/AK3\\/HK.07.00\\/2021\",\"tanggal_dibuat\":\"2021-06-17\",\"tanggal_berakhir\":\"2022-06-17\",\"status\":\"TIDAK AKTIF\",\"kerja_sama_dengan\":\"PO. CAHAYA HOLIDAY\",\"jenis_doc\":\"5\",\"kategori_mou\":\"8\",\"level_mou\":\"4\",\"relevansi_prodi\":null,\"file_mou\":\"Salinan_MoU AKB - Cahaya Holiday.pdf\",\"file_path\":\"\\/file\\/2024\\/05\\/\"}', 'AGUNG ALDI', '::1', 'TAMBAH MASTER DOCUMENT', '2024-05-31 07:26:39', NULL, NULL),
(245, 19, '[{\"id\":null,\"nomor_mou\":null,\"nomor_moa\":\"1605.1\\/AK3\\/KS.00.00\\/2023\",\"judul_moa\":\"PENGEMBANGAN MAHASISWA\",\"tanggal_dibuat\":\"2023-11-15\",\"tanggal_berakhir\":\"2024-11-15\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"PT. SELECTA\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"10 - Sertifikasi\",\"level_moa\":\"4 - Lokal \\/ Regional\",\"relevansi_prodi\":\"1 - Administrasi Server Dan Jaringan Komputer\",\"file_moa\":\"Salinan_MOA_SELECTA_ASJK.pdf\",\"file_path\":\"\\/file\\/2024\\/05\\/\"}]', 'AGUNG ALDI', '::1', 'TAMBAH DOKUMEN MOA', '2024-05-31 07:58:17', NULL, NULL),
(246, 19, '[{\"id\":null,\"nomor_mou\":null,\"nomor_moa\":\"0773\\/AK3\\/HK.07.00\\/2022\",\"judul_moa\":\"PEMENUHAN DAN PENINGKATAN SUMBER DAYA MANUSIA MELALUI TRIDHARMA PERGURUAN TINGGI\",\"tanggal_dibuat\":\"2022-08-04\",\"tanggal_berakhir\":\"2023-08-04\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"BERDIKARI MEDIA UTAMA\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"9 - Lembaga Pelatihan\",\"level_moa\":\"4 - Lokal \\/ Regional\",\"relevansi_prodi\":\"1 - Administrasi Server Dan Jaringan Komputer\",\"file_moa\":\"Salinan_MOA BERDIKARI MU.pdf\",\"file_path\":\"\\/file\\/2024\\/05\\/\"},{\"id\":null,\"nomor_mou\":null,\"nomor_moa\":\"T\\/4\\/AK3\\/HM.01\\/2020\",\"judul_moa\":\"PENGEMBANGAN SUMBER DAYA MANUSIA BIDANG MULTI MEDIA DAN ADMINISTRASI PERKANTORAN\",\"tanggal_dibuat\":\"2020-07-09\",\"tanggal_berakhir\":\"2022-07-09\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"MATAHATI CREATIVE\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"7 - Dunia Usaha\",\"level_moa\":\"4 - Lokal \\/ Regional\",\"relevansi_prodi\":\"4 - Administrasi Perkantoran\",\"file_moa\":\"Salinan_MoA AKB - Matahati.pdf\",\"file_path\":\"\\/file\\/2024\\/05\\/\"},{\"id\":null,\"nomor_mou\":null,\"nomor_moa\":\"931\\/AK3\\/07.00\\/2022\",\"judul_moa\":\"CV AGRO UTAMA MANDIRI LESTARI\",\"tanggal_dibuat\":\"2022-09-06\",\"tanggal_berakhir\":\"2024-09-06\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"PELAKSANAAN TRIDHARMA PERGURUAN TINGGI MELALUI PROGRAM MATCHING FUND\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"5 - Perguruan Tinggi (PT)\",\"level_moa\":\"4 - Lokal \\/ Regional\",\"relevansi_prodi\":\"2 - Penyutingan Audio Video\",\"file_moa\":\"Salinan_MoA Agro Utama Mandiri.pdf\",\"file_path\":\"\\/file\\/2024\\/05\\/\"}]', 'AGUNG ALDI', '::1', 'TAMBAH DOKUMEN MOA', '2024-05-31 08:07:20', NULL, NULL),
(247, 19, '{\"id\":\"22\",\"nomor_mou\":null,\"nomor_moa\":\"T\\/4\\/AK3\\/HM.01\\/2020\",\"tanggal_dibuat\":\"2020-07-09\",\"tanggal_berakhir\":\"2022-07-09\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"MATAHATI CREATIVE\",\"jenis_doc\":\"6\",\"kategori_moa\":\"7\",\"level_moa\":\"4\",\"relevansi_prodi\":null,\"file_moa\":\"\",\"file_path\":\"\"}', 'AGUNG ALDI', '::1', 'UPDATE DOKUMEN MOA', '2024-05-31 08:29:44', NULL, NULL),
(248, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-06-12 07:28:18', NULL, NULL),
(249, 19, '{\"data\":{\"id\":\"21\",\"nomor_mou\":\"T\\/22\\/AK3\\/HK.07.00\\/2021\",\"judul_mou\":\"PELAKSANAAN TRIDHARMA PERGURUAN TINGGI\",\"tanggal_dibuat\":\"2021-06-17\",\"tanggal_berakhir\":\"2026-06-17\",\"jenis\":\"5\",\"kategori\":\"8\",\"level\":\"4\",\"status\":\"AKTIF\",\"relevansi_prodi\":null,\"kerja_sama_dengan\":\"PO. CAHAYA HOLIDAY\",\"file_name\":\"T\\/22\\/AK3\\/HK.07.00\\/2021 - PO. CAHAYA HOLIDAY\"},\"user_id\":\"19\"}', 'AGUNG ALDI', '::1', 'UPDATE MASTER DOCUMENT', '2024-06-12 07:28:51', NULL, NULL),
(250, 19, '{\"id\":null,\"nomor_mou\":\"T\\/1\\/AK3\\/HM.01\\/2020\",\"tanggal_dibuat\":\"2020-07-09\",\"tanggal_berakhir\":\"2024-07-09\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"MATAHATI CREATIVE\",\"jenis_doc\":\"5\",\"kategori_mou\":\"8\",\"level_mou\":\"4\",\"relevansi_prodi\":\"4\",\"file_mou\":\"Salinan_MoU AKB - Matahati.pdf\",\"file_path\":\"\\/file\\/2024\\/06\\/\"}', 'AGUNG ALDI', '::1', 'TAMBAH MASTER DOCUMENT', '2024-06-12 07:41:29', NULL, NULL),
(251, 19, '[{\"id\":\"20\",\"nomor_mou\":\"T\\/1\\/AK3\\/HM.01\\/2020 - MATAHATI CREATIVE\",\"nomor_moa\":\"1605.1\\/AK3\\/KS.00.00\\/2023\",\"judul_moa\":\"PENGEMBANGAN MAHASISWA\",\"tanggal_dibuat\":\"2023-11-15\",\"tanggal_berakhir\":\"2024-11-15\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"PT. SELECTA\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"10 - Sertifikasi\",\"level_moa\":\"4 - Lokal \\/ Regional\",\"relevansi_prodi\":\"1 - Administrasi Server Dan Jaringan Komputer\",\"file_moa\":null,\"file_path\":null},{\"id\":\"23\",\"nomor_mou\":\"T\\/1\\/AK3\\/HM.01\\/2020 - MATAHATI CREATIVE\",\"nomor_moa\":\"931\\/AK3\\/07.00\\/2022\",\"judul_moa\":\"CV AGRO UTAMA MANDIRI LESTARI\",\"tanggal_dibuat\":\"2022-09-06\",\"tanggal_berakhir\":\"2024-09-06\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"PELAKSANAAN TRIDHARMA PERGURUAN TINGGI MELALUI PROGRAM MATCHING FUND\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"5 - Perguruan Tinggi (PT)\",\"level_moa\":\"4 - Lokal \\/ Regional\",\"relevansi_prodi\":\"2 - Penyutingan Audio Video\",\"file_moa\":null,\"file_path\":null},{\"id\":\"21\",\"nomor_mou\":\"T\\/1\\/AK3\\/HM.01\\/2020 - MATAHATI CREATIVE\",\"nomor_moa\":\"0773\\/AK3\\/HK.07.00\\/2022\",\"judul_moa\":\"PEMENUHAN DAN PENINGKATAN SUMBER DAYA MANUSIA MELALUI TRIDHARMA PERGURUAN TINGGI\",\"tanggal_dibuat\":\"2022-08-04\",\"tanggal_berakhir\":\"2023-08-04\",\"status\":\"TIDAK AKTIF\",\"kerja_sama_dengan\":\"BERDIKARI MEDIA UTAMA\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"9 - Lembaga Pelatihan\",\"level_moa\":\"4 - Lokal \\/ Regional\",\"relevansi_prodi\":\"1 - Administrasi Server Dan Jaringan Komputer\",\"file_moa\":null,\"file_path\":null},{\"id\":null,\"nomor_mou\":\"T\\/1\\/AK3\\/HM.01\\/2020 - MATAHATI CREATIVE\",\"nomor_moa\":\"T\\/4\\/AK3\\/HM.01\\/2020\",\"judul_moa\":\"PENGEMBANGAN SUMBER DAYA MANUSIA BIDANG MULTIMEDIA DAN ADMINISTRASI PERKANTORAN\",\"tanggal_dibuat\":\"2024-07-09\",\"tanggal_berakhir\":\"2024-07-09\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"MATAHATI CREATIVE\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"8 - Industri UMKM\",\"level_moa\":\"4 - Lokal \\/ Regional\",\"relevansi_prodi\":\"4 - Administrasi Perkantoran\",\"file_moa\":\"Salinan_MoA AKB - Matahati.pdf\",\"file_path\":\"\\/file\\/2024\\/06\\/\"}]', 'AGUNG ALDI', '::1', 'TAMBAH DOKUMEN MOA', '2024-06-12 07:45:51', NULL, NULL),
(252, 19, '[{\"id\":null,\"nomor_mou\":null,\"nomor_moa\":\"a:1:{i:0;N;}\",\"kegiatan\":\"<p>sdadasds<\\/p>\"}]', 'AGUNG ALDI', '::1', 'TAMBAH KEGIATAN', '2024-06-12 07:57:10', NULL, NULL),
(253, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGOUT', '2024-06-12 08:01:04', NULL, NULL),
(254, 20, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'asjk | ', '::1', 'LOGIN', '2024-06-12 08:01:11', NULL, NULL),
(255, 19, '{\"ip_address\":\"127.0.0.1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '127.0.0.1', 'LOGIN', '2024-06-12 02:29:00', NULL, NULL),
(256, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-06-12 11:39:41', NULL, NULL),
(257, 19, '{\"id\":null,\"nomor_mou\":\"dfgdfgdfgd\",\"tanggal_dibuat\":\"2024-06-12\",\"tanggal_berakhir\":\"2024-06-12\",\"status\":null,\"kerja_sama_dengan\":\"dfgdfgdfg\",\"jenis_doc\":\"5\",\"kategori_mou\":null,\"level_mou\":null,\"relevansi_prodi\":\"2\",\"file_mou\":\"Daftar Ulang PENS.pdf\",\"file_path\":\"\\/file\\/2024\\/06\\/\"}', 'AGUNG ALDI', '127.0.0.1', 'TAMBAH MASTER DOCUMENT', '2024-06-12 05:13:47', NULL, NULL),
(258, 19, '{\"id\":null,\"nomor_mou\":\"dfrhedhd\",\"tanggal_dibuat\":\"2024-06-27\",\"tanggal_berakhir\":\"2024-06-24\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"fdhfhd\",\"jenis_doc\":\"5\",\"kategori_mou\":\"7\",\"level_mou\":\"4\",\"relevansi_prodi\":\"2\",\"file_mou\":\"Daftar Ulang PENS.pdf\",\"file_path\":\"\\/file\\/2024\\/06\\/\"}', 'AGUNG ALDI', '127.0.0.1', 'TAMBAH MASTER DOCUMENT', '2024-06-12 05:16:11', NULL, NULL),
(259, 19, '{\"data\":{\"id\":\"24\",\"nomor_mou\":\"dfrhedhd\",\"judul_mou\":\"gsgsdgsdgf\",\"tanggal_dibuat\":\"2024-06-27\",\"tanggal_berakhir\":\"2024-06-24\",\"jenis\":\"5\",\"kategori\":\"7\",\"level\":\"4\",\"status\":\"AKTIF\",\"relevansi_prodi\":\"2\",\"kerja_sama_dengan\":\"fdhfhd\",\"file_name\":\"dfrhedhd - fdhfhd\"},\"user_id\":\"19\"}', 'AGUNG ALDI', '127.0.0.1', 'UPDATE MASTER DOCUMENT', '2024-06-12 05:32:30', NULL, NULL),
(260, 19, '{\"data\":{\"id\":\"24\",\"nomor_mou\":\"dfrhedhd\",\"judul_mou\":\"alsndbalsndkla\",\"tanggal_dibuat\":\"2024-06-27\",\"tanggal_berakhir\":\"2024-06-24\",\"jenis\":\"5\",\"kategori\":\"7\",\"level\":\"4\",\"status\":\"AKTIF\",\"relevansi_prodi\":\"2\",\"kerja_sama_dengan\":\"fdhfhd\",\"file_name\":\"dfrhedhd - fdhfhd\"},\"user_id\":\"19\"}', 'AGUNG ALDI', '127.0.0.1', 'UPDATE MASTER DOCUMENT', '2024-06-12 05:32:57', NULL, NULL),
(261, 19, '{\"id\":\"24\",\"user_id\":\"19\"}', 'AGUNG ALDI', '127.0.0.1', 'DELETE MASTER DOCUMENT', '2024-06-12 06:01:33', NULL, NULL),
(262, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-06-12 14:26:57', NULL, NULL),
(263, 19, '[{\"id\":null,\"nomor_mou\":null,\"nomor_moa\":\"asdasdasda\",\"judul_moa\":\"dasdasdas\",\"tanggal_dibuat\":\"2024-06-21\",\"tanggal_berakhir\":\"2024-07-02\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"asdasdas\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"4 - Pemerintah\",\"level_moa\":\"4 - Lokal \\/ Regional\",\"relevansi_prodi\":\"3 - Pengolahan Hasil Ternak Unggas\",\"file_moa\":\"Daftar Ulang PENS.pdf\",\"file_path\":\"\\/file\\/2024\\/06\\/\"},{\"id\":null,\"nomor_mou\":null,\"nomor_moa\":\"187236-01\",\"judul_moa\":\"asdasdasd\",\"tanggal_dibuat\":\"2024-06-21\",\"tanggal_berakhir\":\"2024-01-27\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"sdfsdfsd\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"5 - Perguruan Tinggi (PT)\",\"level_moa\":\"7 - Internasional\",\"relevansi_prodi\":\"4 - Administrasi Perkantoran\",\"file_moa\":\"Daftar Ulang PENS.pdf\",\"file_path\":\"\\/file\\/2024\\/06\\/\"}]', 'AGUNG ALDI', '127.0.0.1', 'TAMBAH DOKUMEN MOA', '2024-06-12 07:32:18', NULL, NULL),
(264, 19, '{\"id\":\"26\",\"nomor_mou\":\"T\\/1\\/AK3\\/HM.01\\/2020\",\"nomor_moa\":\"187236-01\",\"tanggal_dibuat\":\"2024-06-21\",\"tanggal_berakhir\":\"2024-01-27\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"sdfsdfsd\",\"jenis_doc\":\"6\",\"kategori_moa\":\"5\",\"level_moa\":\"7\",\"relevansi_prodi\":\"4\",\"file_moa\":\"\",\"file_path\":\"\"}', 'AGUNG ALDI', '127.0.0.1', 'UPDATE DOKUMEN MOA', '2024-06-12 08:21:05', NULL, NULL),
(265, 19, '{\"id\":\"26\",\"user_id\":\"19\"}', 'AGUNG ALDI', '127.0.0.1', 'DELETE DOKUMEN MOA', '2024-06-12 08:22:24', NULL, NULL),
(266, 19, '{\"id\":\"20\",\"nomor_mou\":null,\"nomor_moa\":\"1605.1\\/AK3\\/KS.00.00\\/2023\",\"tanggal_dibuat\":\"2023-11-15\",\"tanggal_berakhir\":\"2024-11-15\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"PT. SELECTA\",\"jenis_doc\":\"6\",\"kategori_moa\":\"10\",\"level_moa\":\"4\",\"relevansi_prodi\":\"1\",\"file_moa\":\"\",\"file_path\":\"\"}', 'AGUNG ALDI', '127.0.0.1', 'UPDATE DOKUMEN MOA', '2024-06-12 08:23:07', NULL, NULL),
(267, 19, '{\"id\":\"25\",\"nomor_mou\":\"T\\/1\\/AK3\\/HM.01\\/2020\",\"nomor_moa\":\"asdasdasda\",\"tanggal_dibuat\":\"2024-06-21\",\"tanggal_berakhir\":\"2024-07-02\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"asdasdas\",\"jenis_doc\":\"6\",\"kategori_moa\":\"4\",\"level_moa\":\"4\",\"relevansi_prodi\":\"3\",\"file_moa\":\"\",\"file_path\":\"\"}', 'AGUNG ALDI', '127.0.0.1', 'UPDATE DOKUMEN MOA', '2024-06-12 08:28:39', NULL, NULL),
(268, 19, '[{\"id\":\"24\",\"nomor_mou\":\"T\\/1\\/AK3\\/HM.01\\/2020 - MATAHATI CREATIVE\",\"nomor_moa\":\"T\\/4\\/AK3\\/HM.01\\/2020\",\"judul_moa\":\"PENGEMBANGAN SUMBER DAYA MANUSIA BIDANG MULTIMEDIA DAN ADMINISTRASI PERKANTORAN\",\"tanggal_dibuat\":\"2024-07-09\",\"tanggal_berakhir\":\"2024-07-09\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"MATAHATI CREATIVE\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"6 - Sekolah\",\"level_moa\":\"6 - Nasional\",\"relevansi_prodi\":\"1 - Administrasi Server Dan Jaringan Komputer\",\"file_moa\":null,\"file_path\":null},{\"id\":null,\"nomor_mou\":\"T\\/1\\/AK3\\/HM.01\\/2020 - MATAHATI CREATIVE\",\"nomor_moa\":\"scvdfsvxcvxcvxcv\",\"judul_moa\":\"cxvxcvxcvxcv\",\"tanggal_dibuat\":\"2024-06-12\",\"tanggal_berakhir\":\"2024-06-18\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"xcvxcvxcv\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"6 - Sekolah\",\"level_moa\":\"6 - Nasional\",\"relevansi_prodi\":\"1 - Administrasi Server Dan Jaringan Komputer\",\"file_moa\":\"Daftar Ulang PENS.pdf\",\"file_path\":\"\\/file\\/2024\\/06\\/\"}]', 'AGUNG ALDI', '127.0.0.1', 'TAMBAH DOKUMEN MOA', '2024-06-12 08:35:43', NULL, NULL),
(269, 19, '{\"id\":\"25\",\"user_id\":\"19\"}', 'AGUNG ALDI', '127.0.0.1', 'DELETE DOKUMEN MOA', '2024-06-12 08:44:48', NULL, NULL),
(270, 19, '{\"id\":\"27\",\"user_id\":\"19\"}', 'AGUNG ALDI', '127.0.0.1', 'DELETE DOKUMEN MOA', '2024-06-12 08:45:10', NULL, NULL),
(271, 19, '{\"ip_address\":\"127.0.0.1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '127.0.0.1', 'LOGIN', '2024-06-12 19:21:05', NULL, NULL),
(272, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-06-13 02:21:47', NULL, NULL),
(273, 19, '[{\"id\":null,\"nomor_mou\":\"T\\/1\\/AK3\\/HM.01\\/2020 - MATAHATI CREATIVE\",\"nomor_moa\":\"[\\\"T\\\\\\/4\\\\\\/AK3\\\\\\/HM.01\\\\\\/2020\\\"]\",\"kegiatan\":\"<p>asdasdasda<\\/p>\"}]', 'AGUNG ALDI', '127.0.0.1', 'TAMBAH KEGIATAN', '2024-06-12 21:05:19', NULL, NULL),
(274, 19, '[{\"id\":\"15\",\"nomor_mou\":\"T\\/1\\/AK3\\/HM.01\\/2020 - MATAHATI CREATIVE\",\"nomor_moa\":\"[\\\"T\\\\\\/4\\\\\\/AK3\\\\\\/HM.01\\\\\\/2020\\\"]\",\"kegiatan\":\"<p>asdasdasda<\\/p>\"}]', 'AGUNG ALDI', '127.0.0.1', 'TAMBAH KEGIATAN', '2024-06-12 21:13:08', NULL, NULL),
(275, 19, '{\"data\":{\"id\":\"20\",\"nomor_mou\":\"T\\/29\\/AK3\\/07.00\\/2021\",\"judul_mou\":\"PELAKSANAAN TRIDHARMA PERGURUAN TINGGI\",\"tanggal_dibuat\":\"2024-06-24\",\"tanggal_berakhir\":\"2023-06-24\",\"jenis\":\"5\",\"kategori\":\"8\",\"level\":\"4\",\"status\":\"TIDAK AKTIF\",\"relevansi_prodi\":[\"1\",\"2\",\"3\",\"4\"],\"kerja_sama_dengan\":\"KOPERASI OLAHAN PANGAN SEJAHTERA\",\"file_name\":\"T\\/29\\/AK3\\/07.00\\/2021 - KOPERASI OLAHAN PANGAN SEJAHTERA\"},\"user_id\":\"19\"}', 'AGUNG ALDI', '127.0.0.1', 'UPDATE MASTER DOCUMENT', '2024-06-12 21:22:11', NULL, NULL),
(276, 19, '{\"data\":{\"id\":\"20\",\"nomor_mou\":\"test123\",\"judul_mou\":\"PELAKSANAAN TRIDHARMA PERGURUAN TINGGI\",\"tanggal_dibuat\":\"2024-06-24\",\"tanggal_berakhir\":\"2023-06-24\",\"jenis\":\"5\",\"kategori\":\"8\",\"level\":\"4\",\"status\":\"TIDAK AKTIF\",\"relevansi_prodi\":[\"1\",\"2\",\"3\"],\"kerja_sama_dengan\":\"KOPERASI OLAHAN PANGAN SEJAHTERA\",\"file_name\":\"test123 - KOPERASI OLAHAN PANGAN SEJAHTERA\"},\"user_id\":\"19\"}', 'AGUNG ALDI', '127.0.0.1', 'UPDATE MASTER DOCUMENT', '2024-06-13 00:14:49', NULL, NULL),
(277, 19, '[{\"id\":\"24\",\"nomor_mou\":\"T\\/1\\/AK3\\/HM.01\\/2020 - MATAHATI CREATIVE\",\"nomor_moa\":\"T\\/4\\/AK3\\/HM.01\\/2020\",\"judul_moa\":\"PENGEMBANGAN SUMBER DAYA MANUSIA BIDANG MULTIMEDIA DAN ADMINISTRASI PERKANTORAN\",\"tanggal_dibuat\":\"2024-07-09\",\"tanggal_berakhir\":\"2024-07-09\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"MATAHATI CREATIVE\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"6 - Sekolah\",\"level_moa\":\"6 - Nasional\",\"relevansi_prodi\":\"[\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\"]\",\"file_moa\":null,\"file_path\":null}]', 'AGUNG ALDI', '127.0.0.1', 'TAMBAH DOKUMEN MOA', '2024-06-13 02:13:12', NULL, NULL),
(278, 19, '[{\"id\":\"24\",\"nomor_mou\":\"T\\/1\\/AK3\\/HM.01\\/2020 - MATAHATI CREATIVE\",\"nomor_moa\":\"T\\/4\\/AK3\\/HM.01\\/2020\",\"judul_moa\":\"PENGEMBANGAN SUMBER DAYA MANUSIA BIDANG MULTIMEDIA DAN ADMINISTRASI PERKANTORAN\",\"tanggal_dibuat\":\"2024-07-09\",\"tanggal_berakhir\":\"2024-07-09\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"MATAHATI CREATIVE\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"6 - Sekolah\",\"level_moa\":\"6 - Nasional\",\"relevansi_prodi\":\"[\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\"]\",\"file_moa\":null,\"file_path\":null}]', 'AGUNG ALDI', '127.0.0.1', 'TAMBAH DOKUMEN MOA', '2024-06-13 02:14:21', NULL, NULL),
(279, 19, '[{\"id\":\"24\",\"nomor_mou\":\"T\\/1\\/AK3\\/HM.01\\/2020 - MATAHATI CREATIVE\",\"nomor_moa\":\"T\\/4\\/AK3\\/HM.01\\/2020\",\"judul_moa\":\"PENGEMBANGAN SUMBER DAYA MANUSIA BIDANG MULTIMEDIA DAN ADMINISTRASI PERKANTORAN\",\"tanggal_dibuat\":\"2024-07-09\",\"tanggal_berakhir\":\"2024-07-09\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"MATAHATI CREATIVE\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"6 - Sekolah\",\"level_moa\":\"6 - Nasional\",\"relevansi_prodi\":\"[\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\"]\",\"file_moa\":null,\"file_path\":null}]', 'AGUNG ALDI', '127.0.0.1', 'TAMBAH DOKUMEN MOA', '2024-06-13 02:14:57', NULL, NULL),
(280, 19, '[{\"id\":\"24\",\"nomor_mou\":\"T\\/1\\/AK3\\/HM.01\\/2020 - MATAHATI CREATIVE\",\"nomor_moa\":\"T\\/4\\/AK3\\/HM.01\\/2020\",\"judul_moa\":\"PENGEMBANGAN SUMBER DAYA MANUSIA BIDANG MULTIMEDIA DAN ADMINISTRASI PERKANTORAN\",\"tanggal_dibuat\":\"2024-07-09\",\"tanggal_berakhir\":\"2024-07-09\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"MATAHATI CREATIVE\",\"jenis_doc\":\"6 - Memorandum of Agreement ( MOA)\",\"kategori_moa\":\"6 - Sekolah\",\"level_moa\":\"6 - Nasional\",\"relevansi_prodi\":\"[\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\"]\",\"file_moa\":null,\"file_path\":null}]', 'AGUNG ALDI', '127.0.0.1', 'TAMBAH DOKUMEN MOA', '2024-06-13 02:15:47', NULL, NULL),
(281, 19, '{\"ip_address\":\"::1\",\"browser\":\"Chrome\",\"os\":\"Windows 10\",\"device\":\"DESKTOP-FP3VDJP\"}', 'AGUNG ALDI | AGUNG ALDI PRASETYA', '::1', 'LOGIN', '2024-06-13 09:49:06', NULL, NULL),
(282, 19, '{\"id\":\"24\",\"nomor_mou\":\"T\\/1\\/AK3\\/HM.01\\/2020\",\"nomor_moa\":\"T\\/4\\/AK3\\/HM.01\\/2020\",\"tanggal_dibuat\":\"2024-07-09\",\"tanggal_berakhir\":\"2024-07-09\",\"status\":\"AKTIF\",\"kerja_sama_dengan\":\"MATAHATI CREATIVE\",\"jenis_doc\":\"6\",\"kategori_moa\":\"6\",\"level_moa\":\"6\",\"relevansi_prodi\":[\"3\",\"4\"],\"file_moa\":\"\",\"file_path\":\"\"}', 'AGUNG ALDI', '127.0.0.1', 'UPDATE DOKUMEN MOA', '2024-06-13 03:03:10', NULL, NULL),
(283, 19, '{\"id\":null,\"nama_template\":\"qweqwe\",\"tipe_file\":\"docx\",\"jenis_doc_id\":\"6\",\"keterangan\":\"<p>qweqwe<\\/p>\",\"file\":\"draft laporan PA.docx\",\"dokumen_path\":\"\\/file\\/2024\\/06\\/\"}', 'AGUNG ALDI', '127.0.0.1', 'TAMBAH MASTER TEMPLATE DOKUMEN', '2024-06-13 03:18:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `master_template_doc`
--

CREATE TABLE `master_template_doc` (
  `id` int NOT NULL,
  `jenis_doc_id` int DEFAULT NULL,
  `nama_template` varchar(255) NOT NULL,
  `file` varchar(255) NOT NULL,
  `tipe_file` varchar(100) DEFAULT NULL,
  `keterangan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dokumen_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `master_template_doc`
--

INSERT INTO `master_template_doc` (`id`, `jenis_doc_id`, `nama_template`, `file`, `tipe_file`, `keterangan`, `dokumen_path`, `created_at`, `updated_at`, `deleted_at`) VALUES
(16, 6, 'qweqwe', 'draft laporan PA.docx', NULL, '<p>qweqwe</p>', '/file/2024/06/', '2024-06-13 03:18:00', '2024-06-13 03:18:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` bigint UNSIGNED NOT NULL,
  `nama_menu` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `menu_parrent` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `nama_menu`, `logo`, `link`, `menu_parrent`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Data Dokumen', '-', 'data-dokumen', NULL, '2023-10-27 08:08:05', '2023-10-27 08:08:05', NULL),
(2, 'Kategori', '-', 'data-dokumen/kategori', 1, '2023-10-27 08:09:42', '2023-10-27 08:09:42', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `menu_users`
--

CREATE TABLE `menu_users` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `menu_id` bigint UNSIGNED DEFAULT NULL,
  `insert` int DEFAULT NULL,
  `update` int DEFAULT NULL,
  `delete` int DEFAULT NULL,
  `view` int DEFAULT NULL,
  `approve` int DEFAULT NULL,
  `print` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `menu_users`
--

INSERT INTO `menu_users` (`id`, `user_id`, `menu_id`, `insert`, `update`, `delete`, `view`, `approve`, `print`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, 1, 1, 1, 1, 1, 1, '2023-10-27 08:12:42', '2023-10-27 08:12:42', NULL),
(2, 1, 2, 1, 1, 1, 1, 1, 1, '2023-10-27 08:13:07', '2023-10-27 08:13:07', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(2, '2018_07_18_135349_create_roles_table', 1),
(3, '2018_07_18_135807_create_prodis_table', 1),
(4, '2019_08_19_000000_create_failed_jobs_table', 1),
(5, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(6, '2023_07_12_000000_create_users_table', 1),
(7, '2023_07_18_140141_create_detail_users_table', 1),
(8, '2023_07_18_140648_create_kategori_mous_table', 1),
(9, '2023_07_18_140926_create_leveling_mous_table', 1),
(10, '2023_07_18_141142_create_mous_table', 1),
(11, '2023_07_19_020317_create_mou_details_table', 1),
(12, '2023_07_19_020709_create_feedback_mous_table', 1),
(13, '2023_07_19_021159_create_download_logs_table', 1),
(14, '2023_08_10_130423_create_menus_table', 1),
(15, '2023_08_10_131150_create_menu_users_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 19, 'authToken', 'c2757a0dac37b3fb4df5204a5cd8de41c66587fbc454dbe73040a27941d9968e', '[\"*\"]', NULL, NULL, '2024-02-09 08:06:46', '2024-02-09 08:06:46'),
(2, 'App\\Models\\User', 19, 'authToken', 'a3fd992bf7ed6bb3270d2991b08ebd2656115a91afc30857945dadf8b36bba0e', '[\"*\"]', NULL, NULL, '2024-02-09 08:07:22', '2024-02-09 08:07:22'),
(3, 'App\\Models\\User', 19, 'authToken', '40e1d184d2eaeee45ec9ff26ed92f02bb1a69e2b04004f6320b3f49171c14871', '[\"*\"]', NULL, NULL, '2024-02-09 08:12:42', '2024-02-09 08:12:42'),
(4, 'App\\Models\\User', 19, 'authToken', 'acedf77abf022d819a03916f8cc1c4fedd79e9e99f1f05e922f475cfbd639643', '[\"*\"]', NULL, NULL, '2024-02-09 08:13:04', '2024-02-09 08:13:04'),
(5, 'App\\Models\\User', 19, 'authToken', '85db1569916fe79a8a4dd4ca2320348f7b99565d4d97e46e694fe2d8217d124f', '[\"*\"]', NULL, NULL, '2024-02-09 08:14:28', '2024-02-09 08:14:28'),
(6, 'App\\Models\\User', 19, 'authToken', 'c18b02f48c413f2bca18bba1eb3a416d55923de90dea0128bb1cb42b1b737a8a', '[\"*\"]', NULL, NULL, '2024-02-09 08:14:49', '2024-02-09 08:14:49'),
(7, 'App\\Models\\User', 19, 'authToken', 'c142683acaf61edd1671cebb282f29b2f8eb3ec4e6da000ee836adc54b38ed84', '[\"*\"]', NULL, NULL, '2024-02-09 08:14:53', '2024-02-09 08:14:53'),
(8, 'App\\Models\\User', 19, 'authToken', 'e8d8c063bd46422edbd1591a54ae2384cc020a23885b88d85a311a6d3be8a4cb', '[\"*\"]', NULL, NULL, '2024-02-09 08:15:57', '2024-02-09 08:15:57'),
(9, 'App\\Models\\User', 19, 'authToken', '12a0c90f0516b49c6c9f4d7eee47e23d5ef2033cf673129b7705b07ea1e2ac8f', '[\"*\"]', '2024-02-09 08:20:34', NULL, '2024-02-09 08:16:40', '2024-02-09 08:20:34'),
(10, 'App\\Models\\User', 19, 'authToken', '2c78297baa9295de37a48455089f27eb4d1a19812b509ddf398142fd1fa5488c', '[\"*\"]', NULL, NULL, '2024-05-11 06:46:51', '2024-05-11 06:46:51'),
(11, 'App\\Models\\User', 19, 'authToken', 'a9fe031e1dccd866c58cabc6806b6cc56b2508745a81906f25e4f8ba14419001', '[\"*\"]', NULL, NULL, '2024-05-11 06:46:55', '2024-05-11 06:46:55'),
(12, 'App\\Models\\User', 19, 'authToken', '49cea65c3a1dd5a0232df9430333f5c939ef0b1ebadfda178edd931d4ac63ca6', '[\"*\"]', NULL, NULL, '2024-05-16 05:12:54', '2024-05-16 05:12:54'),
(13, 'App\\Models\\User', 19, 'authToken', 'c972ffe74a23f7bc5324e195223c9e2d71ac56cf6a94d6f95a337b5dfb6a6bad', '[\"*\"]', NULL, NULL, '2024-05-16 05:13:42', '2024-05-16 05:13:42'),
(14, 'App\\Models\\User', 19, 'authToken', '3fef8075752c3e67c6afa930b08b65f6095ef46de9cbf266b7f5716e61e5b4c2', '[\"*\"]', NULL, NULL, '2024-05-16 05:14:29', '2024-05-16 05:14:29'),
(15, 'App\\Models\\User', 19, 'authToken', '3cf59196a199a021269c73672ec9c5d18aa9cb29847fe4832bd2c8e81cf75856', '[\"*\"]', NULL, NULL, '2024-05-16 05:35:12', '2024-05-16 05:35:12'),
(16, 'App\\Models\\User', 19, 'authToken', '9a2e1ab37019128eb81cf833b7c24b964cc68320e21433780d646ca91ad6a3d3', '[\"*\"]', NULL, NULL, '2024-05-16 05:36:07', '2024-05-16 05:36:07'),
(17, 'App\\Models\\User', 19, 'authToken', 'e62359bddafd4ca777c0839a97357f60ae1298aa627900655cdb49bb469f8767', '[\"*\"]', NULL, NULL, '2024-05-16 05:37:34', '2024-05-16 05:37:34'),
(18, 'App\\Models\\User', 19, 'authToken', '4e1115eb8e984c1c60e3546cea7d4fbba404eb9070bd1efcff27c284a0a7dd6b', '[\"*\"]', NULL, NULL, '2024-05-16 05:43:59', '2024-05-16 05:43:59'),
(19, 'App\\Models\\User', 19, 'authToken', '777baf68d99d8662b9757fc226ae038bff82dbfbccc813f5c38792f0a1637158', '[\"*\"]', NULL, NULL, '2024-05-16 05:44:32', '2024-05-16 05:44:32'),
(20, 'App\\Models\\User', 19, 'authToken', '84906c122b589499d71cf4e609ea64106304253c98f27f8d405a2f180478d423', '[\"*\"]', NULL, NULL, '2024-05-16 05:45:56', '2024-05-16 05:45:56'),
(21, 'App\\Models\\User', 19, 'authToken', 'd60b1a3456557faa876a97c0cbd8ced4418d35ff9bbf4087c89efe5ad9dd354c', '[\"*\"]', NULL, NULL, '2024-05-16 05:51:11', '2024-05-16 05:51:11'),
(22, 'App\\Models\\User', 19, 'authToken', '8926fbbdc8bf37039a5fc6dc0241ea009b77120d798c69bd226bcb4aca5e12c8', '[\"*\"]', NULL, NULL, '2024-05-16 05:54:38', '2024-05-16 05:54:38'),
(23, 'App\\Models\\User', 19, 'authToken', '0e959936257647519543f63401d460de1f3305b43c3d72604963e0989d2dee49', '[\"*\"]', NULL, NULL, '2024-05-21 03:10:41', '2024-05-21 03:10:41'),
(24, 'App\\Models\\User', 19, 'authToken', 'edba094197c301e18a9a7d8d935b9df48d28f681e2b505b002e1afed105a8a7e', '[\"*\"]', NULL, NULL, '2024-05-21 03:10:41', '2024-05-21 03:10:41'),
(25, 'App\\Models\\User', 19, 'authToken', '9c3342690fafa4a76c3bf7b6bc31c561f01f16a32065480be09325c093545e8d', '[\"*\"]', NULL, NULL, '2024-05-21 03:11:23', '2024-05-21 03:11:23'),
(26, 'App\\Models\\User', 19, 'authToken', '5f5b48f012118ae29c8d79fc3f39055bf7ec17b6e343ab4a514d268350925abc', '[\"*\"]', NULL, NULL, '2024-05-21 03:14:04', '2024-05-21 03:14:04'),
(27, 'App\\Models\\User', 19, 'authToken', 'f7f8b97cb683aef3f306c91f0fcd73eaebad9809335a364d3f4a1a34733665f7', '[\"*\"]', NULL, NULL, '2024-05-21 03:17:25', '2024-05-21 03:17:25');

-- --------------------------------------------------------

--
-- Table structure for table `prodis`
--

CREATE TABLE `prodis` (
  `id` bigint UNSIGNED NOT NULL,
  `nama_prodi` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keterangan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `prodis`
--

INSERT INTO `prodis` (`id`, `nama_prodi`, `keterangan`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Administrasi Server Dan Jaringan Komputer', NULL, NULL, NULL, NULL),
(2, 'Penyutingan Audio Video', NULL, NULL, NULL, NULL),
(3, 'Pengolahan Hasil Ternak Unggas', NULL, NULL, NULL, NULL),
(4, 'Administrasi Perkantoran', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `nama_role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keterangan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `nama_role`, `keterangan`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Admin', NULL, NULL, NULL, NULL),
(2, 'Dosen', NULL, NULL, NULL, NULL),
(3, 'Staff / Karyawan', NULL, NULL, NULL, NULL),
(4, 'Kaprodi', NULL, NULL, NULL, NULL),
(7, 'kerjasama / sub humas', '<p><br></p>', '2024-05-04 05:34:43', '2024-05-04 05:34:43', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED DEFAULT NULL,
  `prodi_id` bigint UNSIGNED DEFAULT NULL,
  `nama` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `password_lama` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `prodi_id`, `nama`, `username`, `password`, `remember_token`, `created_at`, `updated_at`, `deleted_at`, `password_lama`) VALUES
(19, 1, NULL, 'AGUNG ALDI', 'admin', '$2y$10$oeeOd3BvPVUEbvg4zosnjODfSu24E7fFN5Fa9RwzrKuK5xVxAz9aO', NULL, '2024-01-24 03:43:01', '2024-04-04 15:32:08', NULL, 'admin'),
(20, 2, 1, 'asjk', 'asjk', '$2y$10$d/G/eLHIF7EWJK.ICBMaF.QmxYyxfiWbYdT7637/nFQ2XGD1pZr0O', NULL, '2024-03-07 04:06:44', '2024-03-07 04:06:44', NULL, 'asjk'),
(21, 7, NULL, 'pengurus kerjasama', 'kerjasama', '$2y$10$8u5vOO3KD2ExmzCr5XyG0uHyxRawgDJWuQRdGa2bGv/cuyEKwAfuq', NULL, '2024-05-04 05:38:02', '2024-05-04 05:38:02', NULL, 'kerjasama');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_users`
--
ALTER TABLE `detail_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `detail_users_users_id_foreign` (`users_id`);

--
-- Indexes for table `dokumen_moa`
--
ALTER TABLE `dokumen_moa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dokumen_mou`
--
ALTER TABLE `dokumen_mou`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jenis_doc`
--
ALTER TABLE `jenis_doc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kategori_doc`
--
ALTER TABLE `kategori_doc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kegiatan`
--
ALTER TABLE `kegiatan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lampiran_kegiatan`
--
ALTER TABLE `lampiran_kegiatan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leveling_doc`
--
ALTER TABLE `leveling_doc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `log_user`
--
ALTER TABLE `log_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_template_doc`
--
ALTER TABLE `master_template_doc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_users`
--
ALTER TABLE `menu_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menu_users_user_id_foreign` (`user_id`),
  ADD KEY `menu_users_menu_id_foreign` (`menu_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `prodis`
--
ALTER TABLE `prodis`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD KEY `users_role_id_foreign` (`role_id`),
  ADD KEY `users_prodi_id_foreign` (`prodi_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail_users`
--
ALTER TABLE `detail_users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `dokumen_moa`
--
ALTER TABLE `dokumen_moa`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `dokumen_mou`
--
ALTER TABLE `dokumen_mou`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `jenis_doc`
--
ALTER TABLE `jenis_doc`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `kategori_doc`
--
ALTER TABLE `kategori_doc`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `kegiatan`
--
ALTER TABLE `kegiatan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `lampiran_kegiatan`
--
ALTER TABLE `lampiran_kegiatan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `leveling_doc`
--
ALTER TABLE `leveling_doc`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `log_user`
--
ALTER TABLE `log_user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=284;

--
-- AUTO_INCREMENT for table `master_template_doc`
--
ALTER TABLE `master_template_doc`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `menu_users`
--
ALTER TABLE `menu_users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `prodis`
--
ALTER TABLE `prodis`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
