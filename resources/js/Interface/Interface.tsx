import { Page, PageProps, ErrorBag, Errors } from "@inertiajs/inertia";

export interface UserInterface {
  email: string
  id: number
  image: string
  name: string
}

export interface GlobalProps extends Page<PageProps> {
  props: {
    announcement: {
      text: string
    }
    banner: {
      image: string
    }
    siteKey: string
    tinyKey: string
    errors: Errors & ErrorBag
  }
}

export interface FlashProps extends Page<PageProps> {
  props: {
    flash: {
      message: string
    }
    errors: Errors & ErrorBag
  }
}

export interface MenuItemProps {
  title: string
  submenu: Array<MenuItemProps> | null
  route: string | null
}

export interface Aktivity {
  id: number
  title: string
  description: string
  image: string
}

export const menuItems: Array<MenuItemProps> = [
  {
    title: 'Beranda',
    submenu: null,
    route: 'home'
  },
  {
    title: 'Profil',
    route: null,
    submenu: [
      {
        title: 'Sambutan Kepala Dinas',
        submenu: null,
        route: 'sambutan'
      },
      {
        title: 'Profil Disdukcapil Kab. Morowali Utara',
        route: 'profil',
        submenu: null
      },
      {
        title: 'Visi & Misi',
        route: 'visimisi',
        submenu: null
      },
      {
        title: 'Struktur Organisasi',
        route: 'struktur',
        submenu: null
      },
      {
        title: "Tupoksi",
        route: null,
        submenu: [
          {
            title: 'Dinas Pemberdayaan Masyarakat dan Desa Daerah',
            route: 'tupoksi.10',
            submenu: null,
          },
          {
            title: 'Sekretariat',
            route: 'tupoksi.1',
            submenu: [
              {
                title: 'Sub. Bagian Program, Keuangan dan Aset',
                route: 'tupoksi.2',
                submenu: null
              },
              {
                title: 'Sub. Bagian Umum dan Kepegawaian',
                route: 'tupoksi.3',
                submenu: null
              },
            ],
          },
          {
            title: 'Bidang Penataan Kerjasama dan Penyelenggaraan Administrasi Pemerintahan Desa',
            route: 'tupoksi.4',
            submenu: [
              {
                title: 'Seksi Penataan dan Kerjasama Desa',
                route: 'tupoksi.5',
                submenu: null
              },
              {
                title: 'Seksi Penyelenggaraan Administrasi Pemerintahan Desa',
                route: 'tupoksi.6',
                submenu: null
              },
            ],
          },
          {
            title: 'Bidang Pemberdayaan dan Pembinaan Masyarakat Desa',
            route: 'tupoksi.7',
            submenu: [
              {
                title: 'Seksi Pembinaan Lembaga Kemasyarakatan dan Pemberdayaan Desa',
                route: 'tupoksi.8',
                submenu: null
              },
              {
                title: 'Seksi Pembinaan Masyarakat dan Hukum Adat',
                route: 'tupoksi.9',
                submenu: null
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Arsip',
    route: 'arsip',
    submenu: null
  },
  {
    title: 'Daftar Pegawai',
    route: null,
    submenu: [
      {
        title: 'Pegawai Negeri Sipil',
        route: 'pns',
        submenu: null,
      },
      {
        title: 'Pegawai Harian Lepas',
        route: 'phl',
        submenu: null,
      }
    ]
  },
  {
    title: 'Aktifitas',
    route: 'aktifitas',
    submenu: null
  },
  {
    title: 'Aplikasi Pemdes',
    route: 'aplikasi',
    submenu: null
  },
  {
    title: 'Admin',
    route: 'dashboard',
    submenu: null
  }
];