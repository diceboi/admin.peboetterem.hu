"use client"

import KiszallitvaButton from "../UI/KiszallitvaButton";

import { useState } from "react"
import { toast } from "sonner";
import { TbChevronDown, TbChevronUp } from "react-icons/tb";
import ElkeszultButton from "../UI/ElkeszultButton";


interface RendelesTileProps {
    data: {
        kiszallitva: boolean;
        elkeszult: boolean;
        _id: string;
        createdAt: string;
      formData: {
        nev: string;
        email: string;
        tel: string;
        irszam: string;
        telepules: string;
        utca: string;
        emelet: string;
        fizetesi: {
            keszpenz: boolean,
            bankkartya: boolean,
            szepkartya: boolean,
        },
        megjegyzes: string;
        adatkezelesi: boolean
      };
      cartItems: {
        count: number,
        tipus: number,
        elsodlegesar: number;
        masodlagosar: number;
        nev: string;
        _id: string;
        allergenek: string;
        elsoelotag: string;
        kategoria: string;
        masodikelotag: string;
      }[];
    };
  }

  const RendelesTile: React.FC<RendelesTileProps> = ({ data }) => {

    const id = data._id;
    console.log(data)

    const [updatedData, setUpdatedData] = useState({
        kiszallitva: data.kiszallitva,
        elkeszult: data.elkeszult,
      });

    const [openRendeles, setOpenRendeles] = useState(false);

    const toggleRendeles = () => {
        setOpenRendeles(prevState => !prevState);
    };

    const totalPrice = data.cartItems?.reduce((accumulator: number, currentItem: any) => {
        const itemPrice = currentItem.tipus === 0 ? currentItem.elsodlegesar : currentItem.masodlagosar;
        return accumulator + itemPrice * currentItem.count;
      }, 0);

    const handleKiszallitva = async () => {

        setUpdatedData({
            kiszallitva: true,
            elkeszult: false,
          });

        try {
            const res = await fetch(`/api/updateRendelesek/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                kiszallitva: true,
                elkeszult: false,
              }),
            });

            if (res.ok) {
                toast.success('Sikeres frissítés');
            } else {
                toast.error('A frissítés nem sikerült');
            }


            const ugyfelkiszallitva = await fetch("/api/email/kiszallitva", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nev: data.formData.nev,
                    email: data.formData.email,
                }),
            });

            if (ugyfelkiszallitva.ok) {
                console.log('Sikeres email');
            } else {
                console.log('nem sikerult email');
            }

        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

  return (
    <section className={`group flex flex-col w-full h-auto shadow-box p-8 rounded-xl overflow-hidden border-l-8 ${data.kiszallitva ? ('border-green-700') : ('border-[--alert]')}`}>
        <button className='flex flex-col lg:flex-row justify-between w-full h-full z-50 ' onClick={toggleRendeles}>
            <div className="flex flex-col-reverse lg:flex-row items-start gap-2">
                <h1>{data.formData.nev} - {data.formData.telepules}</h1>

                {
                data.kiszallitva ?
                 <p className="px-2 py-1 bg-green-700 text-white text-xl font-bebas rounded-md">Kiszállítva</p> 
                 : 
                 <p className="px-2 py-1 bg-[--alert] text-white text-xl font-bebas rounded-md">Új rendelés</p>
                }

            </div>
            <div className="flex items-start flex-col gap-1">
                <p className="text-xs">Azonosító: {data._id}</p>
                <p className="text-xs">Rendelés időpontja: {data.createdAt}</p>
            </div>
            <div className="flex justify-center items-center">
                {openRendeles ? <TbChevronUp /> : <TbChevronDown />}
            </div>          
        </button>
        <div className={`${openRendeles ? 'flex flex-col gap-4 transition-all z-0 border-t border-neutral-300 mt-8' : 'flex-col gap-4 transition-all z-0 border hidden'}`}>
            <div className='flex flex-col lg:flex-row items-start'>
                <div className="flex items-start flex-wrap w-full lg:flex-nowrap py-4">
                    <div className="grid grid-cols-1 gap-2 w-full">
                        <div className='flex items-center w-full gap-4'>
                            <p>Név:</p>
                            <p className=" font-bold">{data.formData.nev}</p>
                        </div>
                        <div className='flex items-center w-full gap-4'>
                            <p>Email:</p>
                            <p className=" font-bold">{data.formData.email}</p>
                        </div>
                        <div className='flex items-center w-full gap-4'>
                            <p>Tel:</p>
                            <p className=" font-bold">{data.formData.tel}</p>
                        </div>
                        <div className='flex items-center w-full gap-4'>
                            <p>Ir.szám:</p>
                            <p className=" font-bold">{data.formData.irszam}</p>
                        </div>
                        <div className='flex items-center w-full gap-4'>
                            <p>Település:</p>
                            <p className=" font-bold">{data.formData.telepules}</p>
                        </div>
                        <div className='flex items-center w-full gap-4'>
                            <p>Utca, házszám:</p>
                            <p className=" font-bold">{data.formData.utca}</p>
                        </div>
                        <div className='flex items-center w-full gap-4'>
                            <p>Emelet, ajtó:</p>
                            <p className=" font-bold">{data.formData.emelet}</p>
                        </div>
                        <div className='flex items-center w-full gap-4'>
                            <p>Fizetési mód:</p>
                            <p className=" font-bold">
                                {data.formData.fizetesi?.keszpenz && 'Készpénz'}
                                {data.formData.fizetesi?.bankkartya && 'Bankkártya'}
                                {data.formData.fizetesi?.szepkartya && 'Szépkártya'}
                            </p>
                        </div>
                        <div className='flex items-center w-full gap-4'>
                            <p>Megjegyzés:</p>
                            <p className=" font-bold">{data.formData.megjegyzes}</p>
                        </div>
                        <div className='flex items-center w-full gap-4'>
                            <p>Adatkezelésit elfogadta?</p>
                            <p className=" font-bold">{data.formData.adatkezelesi ? 'Igen' : 'Nem'}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full lg:flex-nowrap gap-2 py-4">

                    {data.cartItems?.map((cartItem, index) => (
                        
                        <div key={index} className='flex items-center justify-between w-full gap-4 border-b border-neutral-200'>
                            <div className="flex flex-row gap-2">
                                <p className="min-w-max">
                                    {cartItem.elsoelotag && cartItem.tipus === 0 ? (
                                    <>
                                        {cartItem.count + ' x ' + cartItem.nev + `(${cartItem.elsoelotag})`}
                                    </>
                                    ) : cartItem.tipus === 1 ? (
                                    <>
                                        {cartItem.count + ' x ' + cartItem.nev + `(${cartItem.masodikelotag})`}
                                    </>
                                    ) : (
                                    <>
                                        {cartItem.count + ' x ' + cartItem.nev}
                                    </>
                                    )}    
                                </p>
                            </div>
                            
                            <p className="font-bold min-w-max">{cartItem.tipus === 0 ? cartItem.elsodlegesar * cartItem.count : cartItem.masodlagosar * cartItem.count} Ft</p>                            
                        </div>
 
                    ))}
                    <div className="flex flex-row justify-between">
                        <p className="min-w-max">Összesen: </p>
                        <p className="min-w-max font-bold">{totalPrice} Ft</p>
                    </div>
                    
                </div>
                
            
            </div>
            <div className="flex flex-row gap-4 w-full pt-4">
                
                


                {
                data.kiszallitva ? '' : <KiszallitvaButton buttontxt={"Kiszállítva"} onClick={handleKiszallitva} />
                }



            </div>
        </div>
        
    </section>
  )
}


export default RendelesTile;