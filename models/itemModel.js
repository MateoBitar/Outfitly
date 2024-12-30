class Item {
    // Constructor to initialize the Item object with given properties
    constructor(id, name, image, category, style, brand, color, user_id) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.category = category;
        this.style = style;
        this.brand = brand;
        this.color = color;
        this.user_id = user_id;
    }

    // Static method to create an Item instance from a database row
    static fromRow(row) {
        return new Item(
            row.item_id,        // Map database column 'item_id' to 'id'
            row.item_name,      // Map 'item_name' to 'name'
            row.item_image,     // Map 'item_image' to 'image'
            row.category,       // Map 'category' to 'category'
            row.item_style,     // Map 'item_style' to 'style'
            row.brand,          // Map 'brand' to 'brand'
            row.color,          // Map 'color' to 'color'
            row.user_id         // Map 'user_id' to 'user_id'
        );
    }
}

module.exports = Item;
