"use client";

import type {Field} from "~/cart/types";

import type {Product} from "../types";

import {useState} from "react";
import {Button} from "@chakra-ui/react";

import CartDrawer from "~/cart/components/CartDrawer";
import {useCart} from "~/cart/context";

import ProductCard from "../components/ProductCard";

function StoreScreen({products, fields}: {products: Product[]; fields: Field[]}) {
  const [{total, quantity}, {addItem}] = useCart();
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col gap-6">
        {products.length ? (
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))]))]">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={(_product: Product) => addItem(Symbol(), {..._product, quantity: 1})}
              />
            ))}
          </div>
        ) : (
          <p className="text-white/50 text-lg m-auto">No hay productos</p>
        )}
        {Boolean(quantity) && (
          <div className="flex items-center bottom-4 content-center sticky m-auto">
            <Button
              boxShadow="xl"
              colorScheme="primary"
              data-testid="show-cart"
              size="lg"
              width={{base: "100%", sm: "fit-content"}}
              onClick={() => setIsCartOpen(true)}
            >
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <p className="leading-6">Ver pedido</p>
                  <p className="bg-black/25 rounded-sm text-white/90 text-xs font-semibold px-2 py-1">
                    {quantity} items
                  </p>
                </div>
                <p className="leading-6">{total}</p>
              </div>
            </Button>
          </div>
        )}
      </div>
      <CartDrawer fields={fields} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default StoreScreen;