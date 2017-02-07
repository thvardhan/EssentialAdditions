package com.spikespaz.essentialadditions;

import com.spikespaz.essentialadditions.Proxy.CommonProxy;
import com.spikespaz.essentialadditions.blocks.ModBlocks;
import com.spikespaz.essentialadditions.items.ModItems;
import com.spikespaz.essentialadditions.world.ModWorld;
import cpw.mods.fml.common.Mod;
import cpw.mods.fml.common.SidedProxy;
import cpw.mods.fml.common.event.FMLPreInitializationEvent;


@Mod(modid = EssentialAdditions.MODID, name = EssentialAdditions.NAME, version = EssentialAdditions.VERSION)
public class EssentialAdditions {
    static final String MODID = "essentialadditions";
    static final String NAME = "Essential Additions";
    static final String VERSION = "1.3.0";
    private static final String CLIENTSIDE = "com.spikespaz.essentialadditions.Proxy.ClientProxy";
    private static final String SERVERSIDE = "com.spikespaz.essentialadditions.Proxy.CommonProxy";

    @SidedProxy(clientSide = EssentialAdditions.CLIENTSIDE, serverSide = EssentialAdditions.SERVERSIDE)
    public static CommonProxy proxy;

    @Mod.EventHandler
    public static void PreLoad(FMLPreInitializationEvent PreEvent) {
        ModBlocks.mainRegistry();
        ModItems.mainRegistry();
        ModWorld.mainRegistry();
        CraftingRecipes.mainRegistry();
        proxy.registerRenderInfo();
    }
}