'use client'

import { ArrowRight, ExternalLink } from 'lucide-react'

interface Skin {
  id: string
  name: string
  weapon: string
  price: number
  imageUrl: string
  marketHashName: string
  rarity: string
}

interface SkinCategory {
  title: string
  subtitle: string
  priceRange: string
  steamUrl: string
  skins: Skin[]
}

// Static data with real Steam CDN image URLs
const CATEGORIES: SkinCategory[] = [
  {
    title: 'AK-47',
    subtitle: 'Budget alternatives',
    priceRange: '$10-25',
    steamUrl: 'https://steamcommunity.com/market/search?appid=730&q=AK-47',
    skins: [
      { id: '1', weapon: 'AK-47', name: 'Redline', price: 14.50, rarity: 'Classified', marketHashName: 'AK-47 | Redline (Field-Tested)', imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPrxN7LEmyVQ7MEpiLuSrYmnjQO3-UdsZGrzLYLEd1VqNF3T_ljrwLjqgpG76c_JynRivCEh4yzfzRflhBtSLrs4LqOXFg' },
      { id: '2', weapon: 'AK-47', name: 'Blue Laminate', price: 11.20, rarity: 'Classified', marketHashName: 'AK-47 | Blue Laminate (Factory New)', imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPv9NLPF2GNUvZIg0r6R9o2njQ23-ENsZ2-iJoeVdAJrNVzT_wDql-i905-77Jucn3AwuiV24nqOykHk0x4ea-Rr1PKKH_JBPJVS' },
      { id: '3', weapon: 'AK-47', name: 'Elite Build', price: 12.80, rarity: 'Mil-Spec', marketHashName: 'AK-47 | Elite Build (Factory New)', imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhnfwJD3dm0m4S0k9eNnvD1J4Tdn2xZ_Pp9i_vG8ML2jF2hpl1tYGj7d4CXIFJvMFrY81HolOm91Je4tJzLmHVmvyR0sH_UmRG10E5SLrs4-hKi6w' },
      { id: '4', weapon: 'AK-47', name: 'Slate', price: 18.50, rarity: 'Industrial', marketHashName: 'AK-47 | Slate (Factory New)', imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhzw8zFdC5K086jloSYqPHmJ7fUkFRd4cJ5nqeT8Ijk6wbmr0o4ZDzxdoeVdAA3Yl_R_1nqlOi6gJftvJ6bzCBh7yYntyvUykLkhxwebrM8guu-Uw2kVvlBCvM' },
      { id: '5', weapon: 'AK-47', name: 'Rat Rod', price: 15.30, rarity: 'Mil-Spec', marketHashName: 'AK-47 | Rat Rod (Factory New)', imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV08-4lpSOhcj5Nr_Yg2Yf7cEl3eLHpd732gW1-kU-ZW-iJY6TdQJtYA7UqVS8lebthJe_u5zLzHowu3J25mGdwUI2fq9k3Q' },
    ]
  },
  {
    title: 'AWP',
    subtitle: 'Affordable options',
    priceRange: '$15-50',
    steamUrl: 'https://steamcommunity.com/market/search?appid=730&q=AWP',
    skins: [
      { id: '6', weapon: 'AWP', name: 'Asiimov', price: 85.00, rarity: 'Covert', marketHashName: 'AWP | Asiimov (Field-Tested)', imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJK9cyzhr-KmsjwPKvBmm5u5cB1g_zMu4qgjgTkrxJuZm_zIdOVJgZoZFzV_FDvxOjqhpe6v5_KynRmu3Uj4HbUyha1n1gSOVGBpgfE' },
      { id: '7', weapon: 'AWP', name: 'Redline', price: 18.50, rarity: 'Classified', marketHashName: 'AWP | Redline (Field-Tested)', imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAZx7PLfYQJS_919mt2NmOT2P77Sk24I7pEgj7qRoNjy0Aa1-UM4YmzzJYeVJgFqZV3SqADswLi815bquZjMmHIwviVw4i2MyUPhgRxSOeMv26LuGcW-Wg' },
      { id: '8', weapon: 'AWP', name: 'Fever Dream', price: 22.00, rarity: 'Classified', marketHashName: 'AWP | Fever Dream (Factory New)', imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAZt7P_BdjVW4tW4k7-KgOfLP7LWnn8fsMQj27vC8Yjw0QHs8kVrYW-nLI-XcwU8YVHR8lK7l7q6hJe_uszMySBmsnQl5SrfmEe-n0xMb-BxxavI2qPJTQ' },
      { id: '9', weapon: 'AWP', name: 'Elite Build', price: 16.40, rarity: 'Mil-Spec', marketHashName: 'AWP | Elite Build (Factory New)', imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAZh7PLfYQJD_9W7m5a0mvLwOq7cqWdQ689j3byQrYqm2lCw_kQ5YWHwJ4WVcwc3NQ3VqFO3wu3t1pe9vc-fnXZqvyYgsSmLzBe2n1gSOYyVrXPb' },
      { id: '10', weapon: 'AWP', name: 'Phobos', price: 19.80, rarity: 'Mil-Spec', marketHashName: 'AWP | Phobos (Factory New)', imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAZx0PLfYQJN_t24k7-KkPD1Pb-ukmpQ68Nu2u2Y8I_xiQKwqktrNjv3coOUdQY6ZFnVqAW3k-bngcDvvJzIyCM1pGB8slLN8cOM' },
    ]
  },
  {
    title: 'M4A4',
    subtitle: 'Value picks',
    priceRange: '$5-20',
    steamUrl: 'https://steamcommunity.com/market/search?appid=730&q=M4A4',
    skins: [
      { id: '11', weapon: 'M4A4', name: 'Desolate Space', price: 18.00, rarity: 'Classified', marketHashName: 'M4A4 | Desolate Space (Field-Tested)', imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwT09S5g4yCkP_gfezTwjlUuMNwjLqQptym21Xn-ENsZ2mmItbGdFM_M1vS-Fi5yLvpgZfvuJ_NmHprpGB8smFNe_I8' },
      { id: '12', weapon: 'M4A4', name: 'Neo-Noir', price: 15.50, rarity: 'Covert', marketHashName: 'M4A4 | Neo-Noir (Field-Tested)', imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhnwMzFJGgG09C_kIWFg8jhOLnUk1Rd4cJ5nqfHpdj22Q3g_hJvYD3zI4bEcQJqZwrY-FjsyL_thJa8v8nLnHdjuyR07HvVl0HlhxMbP-Zu0vef' },
      { id: '13', weapon: 'M4A4', name: 'Buzz Kill', price: 12.30, rarity: 'Classified', marketHashName: 'M4A4 | Buzz Kill (Field-Tested)', imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uOhkL-GkvPLP7LWnn8f6pYg0u2Zrdi2iQbh-kFuamGhJYKVcAZoZ1zW-1nvx-bp0JO_7s-anGwj5HeE2PJBTg' },
      { id: '14', weapon: 'M4A4', name: 'The Battlestar', price: 8.50, rarity: 'Restricted', marketHashName: 'M4A4 | The Battlestar (Factory New)', imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alDLbUhFRd4cJ5nqeTp4_xi1a1_Rc5YW3yJNKSJAZsNAyD8wDqyOq8g8S87s6YyWwj5Hen1kndyhW1h09SLrs' },
      { id: '15', weapon: 'M4A4', name: 'Spider Lily', price: 9.80, rarity: 'Restricted', marketHashName: 'M4A4 | Spider Lily (Factory New)', imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO6nYeDg8j5NrLWmm5U18l4jeHVu4qt3Qaw80NuZDuhJo-RegU4NArS_1jrxey80p-57p-amHA2u3Un4y3bnAv330_5glvC2g' },
    ]
  },
  {
    title: 'Knives',
    subtitle: 'Entry-level',
    priceRange: '$60-150',
    steamUrl: 'https://steamcommunity.com/market/search?appid=730&q=Knife',
    skins: [
      { id: '16', weapon: 'Navaja Knife', name: 'Forest DDPAT', price: 62.00, rarity: 'Covert', marketHashName: '★ Navaja Knife | Forest DDPAT (Field-Tested)', imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJl4G0k_jkI7fUhFRB4MRij7j--YXygED6-EpsZTvxJYeWdFU8YQnR-QK9ye7u0Z6-782fnXFhsiEi7CnfmRe3hBhLcKUx0mLajK-J' },
      { id: '17', weapon: 'Gut Knife', name: 'Scorched', price: 75.00, rarity: 'Covert', marketHashName: '★ Gut Knife | Scorched (Field-Tested)', imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPD1PrbQqW9e-NV9j_v-5YT0m1HlqEdpYjulJoWcelQ4NVyF_la5lOi9h5G07puYm3Bk6CYr7WGdwUIGwKHJE84' },
      { id: '18', weapon: 'Falchion Knife', name: 'Boreal Forest', price: 89.00, rarity: 'Covert', marketHashName: '★ Falchion Knife | Boreal Forest (Field-Tested)', imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD4eOlnIGZqOrgYr7Dk29u4MBwnPCP8I6h2gPkrkRvZW-hItKTIQE2NA3V_lDqwLvt0MO8vp6YmHJquCQ8pSGKy0HjgRpSOONxxavJUxzPH-NPXO5S' },
      { id: '19', weapon: 'Shadow Daggers', name: 'Safari Mesh', price: 68.00, rarity: 'Covert', marketHashName: '★ Shadow Daggers | Safari Mesh (Field-Tested)', imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP09C3h5SYhcj2NrnCmXlu5cB1g_zMu4rw0FXk_kJqZmiiJI-ScgBsZl_R8ljoyOjng5C87pyanHVluSgh7HuMyBbi0R8dZuBxxavLvdCyHtA' },
      { id: '20', weapon: 'Bowie Knife', name: 'Stained', price: 95.00, rarity: 'Covert', marketHashName: '★ Bowie Knife | Stained (Field-Tested)', imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LbbQJO5du-gM7SlvOtauLTx2pS18N0g-PE8Irw3AXg_Rc5MG3wLIOScQA2YA3Y_lC-l-q6h5e6tZucmyRru3Ui5X6Ol0bhgR9SLrs44OLc-fg' },
    ]
  },
]

function SkinCard({ skin }: { skin: Skin }) {
  return (
    <div className="glass rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform">
      {/* Image */}
      <div className="relative aspect-square bg-dark-900 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <img 
          src={skin.imageUrl}
          alt={`${skin.weapon} | ${skin.name}`}
          className="absolute inset-0 w-full h-full object-contain p-3"
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-0.5 backdrop-blur-sm rounded text-xs font-medium ${
            skin.rarity === 'Covert' ? 'bg-red-500/20 text-red-400' :
            skin.rarity === 'Classified' ? 'bg-purple-500/20 text-purple-400' :
            skin.rarity === 'Restricted' ? 'bg-blue-500/20 text-blue-400' :
            skin.rarity === 'Mil-Spec' ? 'bg-sky-500/20 text-sky-400' :
            'bg-white/10 text-gray-300'
          }`}>
            {skin.rarity}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-bold text-sm mb-0.5 text-white truncate">
          {skin.weapon}
        </h3>
        <p className="text-xs text-gray-400 truncate mb-2">{skin.name}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-500 uppercase">From</p>
            <div className="text-lg font-black text-white">
              ${skin.price.toFixed(2)}
            </div>
          </div>
          <a
            href={`https://steamcommunity.com/market/listings/730/${encodeURIComponent(skin.marketHashName)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 glass-hover rounded-lg"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}

function CategorySection({ category }: { category: SkinCategory }) {
  return (
    <div className="mb-16">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-white">{category.title}</h2>
          <p className="text-gray-400 text-lg">{category.subtitle} • {category.priceRange}</p>
        </div>
        <a
          href={category.steamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 glass-hover rounded-xl font-semibold group text-sm"
        >
          Browse All
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Skins Grid - 5 columns */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {category.skins.map((skin) => (
          <SkinCard key={skin.id} skin={skin} />
        ))}
      </div>

      {/* Mobile Browse All */}
      <a
        href={category.steamUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden flex items-center justify-center gap-2 w-full mt-4 px-6 py-3 glass-hover rounded-xl font-semibold group"
      >
        Browse All {category.title}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  )
}

export default function FeaturedSkins() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {CATEGORIES.map((category) => (
          <CategorySection key={category.title} category={category} />
        ))}
      </div>
    </section>
  )
}
