const Users = [{
        user_id: 1,
        first_name: "Michael",
        last_name: "Bouwer",
        verified: false,
        created: Date.now() - 4000,
        email: "bouwermichael@gmail.com",
        user_image_url: "https://via.placeholder.com/600"
    },
    {
        user_id: 2,
        first_name: "James",
        last_name: "Poes",
        verified: true,
        created: Date.now() - 4000,
        email: "dogface@gmail.com",
        user_image_url: "https://via.placeholder.com/600"
    }
]

const Assets = [{
        asset_id: 1,
        user_id: 1,
        user_asset_state: 0,
        asset_type: "Laptops",
        asset_name: "Macbook pro",
        asset_description: "2016 space grey swedish keyboard",
        asset_image_url: "https://via.placeholder.com/600",
        asset_serial_number: "jhdbfjs374twq74r",
        asset_mac_address: "JXKJDSKKABV97892348734BHJKKBVDV",
        created: () => Date.now() - 3000
    },
    {
        asset_id: 2,
        user_id: 1,
        user_asset_state: 2,
        asset_type: "Mobile Phones",
        asset_name: "iPhone 6",
        asset_description: "16gb space greay",
        asset_image_url: "https://via.placeholder.com/600",
        asset_serial_number: "jbvlkfgporitpsg",
        asset_mac_address: "ODKDNGKDNG9889KNDKHGKDG",
        created: () => Date.now() - 3000
    },
    {
        asset_id: 3,
        user_id: 2,
        user_asset_state: 3,
        asset_type: "Laptops",
        asset_name: "Lenovo thinkpad",
        asset_description: "black i7",
        asset_image_url: "https://via.placeholder.com/600",
        asset_serial_number: "ldfjoerkeoklmdfg",
        asset_mac_address: "KJDNKDGNKDGW93945KJDGn",
        created: () => Date.now() - 3000
    }
]

module.exports = {
    Users,
    Assets
}