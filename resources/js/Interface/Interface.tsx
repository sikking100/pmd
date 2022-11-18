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
            title: 'Sekretariat',
            route: 'sekretariat',
            submenu: [
              {
                title: 'Subbag. Program, Keuangan dan Aset',
                route: 'keuangan',
                submenu: null
              },
              {
                title: 'Subbag. Kepegawaian dan Umum',
                route: 'kepegawaian',
                submenu: null
              },
            ],
          },
          {
            title: 'Bidang Fasilitasi Pendaftaran Penduduk',
            route: 'pendaftaran',
            submenu: [
              {
                title: 'Seksi Identitas Penduduk',
                route: 'seksi',
                submenu: null
              },
              {
                title: 'Seksi Pindah Datang Penduduk',
                route: 'pindah',
                submenu: null
              },
              {
                title: 'Seksi Pendataan Penduduk',
                route: 'pendataan',
                submenu: null
              },
            ],
          },
          {
            title: 'Bidang Fasilitasi Pencatatan Sipil',
            route: 'pencatatan',
            submenu: [
              {
                title: 'Seksi Kelahiran',
                route: 'kelahiran',
                submenu: null
              },
              {
                title: 'Seksi Perkawinan dan Perceraian',
                route: 'perkawinan',
                submenu: null
              },
              {
                title: 'Seksi Perubahan Status Anak, Kewarganegaraan dan Kematian',
                route: 'perubahan',
                submenu: null
              },
            ],
          },
          {
            title: 'Bidang Pengelolaan Informasi Administrasi Kependudukan dan Pemanfaatan Data',
            route: 'pengelolaan',
            submenu: [
              {
                title: 'Seksi Sistem Informasi Administrasi Kependudukan',
                route: 'sistem',
                submenu: null
              },
              {
                title: 'Seksi Pengelolaan dan Penyajian Data Kependudukan',
                route: 'penyajian',
                submenu: null
              },
              {
                title: 'Seksi Kerjasama dan Inovasi Pelayanan',
                route: 'kerjasama',
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
    title: 'Admin',
    route: 'dashboard',
    submenu: null
  }
];