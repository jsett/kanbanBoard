import React, { useState, useEffect, Suspense } from 'react';
import { DndContext } from '@dnd-kit/core';
import { useHydrateAtoms } from "jotai/utils";
import { BoardStoreData, boardAtom, statesAtomsAtom } from "@/store/data";
import { useAtom } from "jotai";
import { BoardData } from "./app";
import { StateColumn } from './stateColumn';

export default function Kanban({ board }: { board: BoardData }) {
    useHydrateAtoms([[boardAtom, board]])
    const [myboard, setMyboard] = useAtom(boardAtom)
    const [statesAtoms] = useAtom(statesAtomsAtom);

    const boardMapping = myboard ? statesAtoms.map((stateAtom) => <StateColumn key={`${stateAtom}`} boardId={myboard.id} stateAtom={stateAtom} />) : <div>Loading</div>;

    function handleDragEnd(event) {
        const { over, active } = event;
        console.log(event);
        active.data.current.updater(over.id);
    }

    return <>
        <div className=" w-full h-full">
            <DndContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-4 gap-2 p-2 bg-neutral-content h-full">
                    {boardMapping}
                </div>
            </DndContext>
        </div>
    </>
}