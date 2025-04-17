require("dotenv").config(); // Ensure dotenv is loaded at the very beginning

const Menu = require("../models/menumodel");
const uploadImageOnCludinary = require("../utils/imageUplod");
const Restaurant = require("../models/restaurantmodel");

const addMenu = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const file = req.file;

    if (!file) {
      res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const imageUrl = await uploadImageOnCludinary(file);
    const menu = await Menu.create({
      name,
      description,
      price,
      image: imageUrl,
    });
    const restaurant=await Restaurant.findOne({user:req.userId});
    if(restaurant){
              restaurant.menus.push(menu._id);
              await restaurant.save();
    }

    return res.status(201).json(({
        success:true,
        message:"Menu added successfully",
        menu,
    }));

  } catch (error) {
    console.error("Restaurant Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const editMenu = async (req, res) => {
    try {
     const {id}=req.params;
     const {name,description,price}=req.body;

     const file=req.file;
     const menu=await Menu.findById(id);
     if(!menu){
        return res.status(404).json({
            success:false,
            message:"Menu not found!"
        })
     }
     if(name) menu.name=name;
     if(description) menu.description=description;
     if(price) menu.price=price;

     if(!file){
        const imageUrl= await uploadImageOnCludinary(file);
        menu.image=imageUrl;
     }

     await menu.save();

    

  
      return res.status(201).json(({
          success:true,
          message:"Menu updated successfully",
          menu,
      }));
  
    } catch (error) {
      console.error("Restaurant Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  const deleteMenu = async (req, res) => {
    try {
     const {id}=req.params;

     const menu= await Menu.findByIdAndDelete(id);
        // Check if the menu item exists
        if (!menu) {
            return res.status(404).json({
                success: false,
                message: "Menu not found",
            });
        }

     

      return res.status(201).json(({
          success:true,
          message:"Menu deleted successfully",
          menu,
      }));
  
    } catch (error) {
      console.error("Restaurant Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
module.exports={
    addMenu,
    deleteMenu,
    editMenu
}