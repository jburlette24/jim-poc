import * as React from 'react'
import { PropsWithChildren, FunctionComponent } from 'react';
import { Stack, IStackTokens } from '@fluentui/react';
import {
    DocumentCard,
    DocumentCardTitle,
    DocumentCardDetails,
    DocumentCardImage,
    IDocumentCardStyles,
} from '@fluentui/react/lib/DocumentCard';
import { ImageFit } from '@fluentui/react/lib/Image';
import './PokemonCard.css';

const stackTokens: IStackTokens = { childrenGap: 40 };

interface IPokemonCardProps {
    url: string;
    handleClick: (pokemon:any) => void;
}

export const PokemonCard: FunctionComponent<IPokemonCardProps> = (props: PropsWithChildren<IPokemonCardProps>) => {


    const [pokemon, setPokemon] = React.useState<any>()
    const catchThatPokemon = async () => {
        const res = await fetch(props.url)
        return (res.json())
    }
    const getPokemonTypeString = (types: any[]) => {
        return `Types: ${types.map(type => ` ${type.type.name}`)};  `
    }

    const cardStyles: IDocumentCardStyles = {
        root: { display: 'inline-block', marginRight: 20, marginBottom: 20, width: 320 }
    }

    React.useEffect(() => {
        catchThatPokemon().then(result => {
            console.log(result)
            setPokemon(result)
        })
    }, [])

    if (pokemon){
           return ( 
        <DocumentCard
            styles={cardStyles}
            aria-label={`Pokemon Card`}
            onClick={() => props.handleClick(pokemon)}>
            <DocumentCardImage height={250} imageFit={ImageFit.centerContain} imageSrc={pokemon.sprites.other.dream_world.front_default} />
            <DocumentCardDetails>
                <DocumentCardTitle className='pokemonCardTitle' title={pokemon ? pokemon.name: 'name'} />
                <DocumentCardTitle className='pokemonCardTitle' showAsSecondaryTitle title={getPokemonTypeString(pokemon.types)} />
                <DocumentCardTitle className='pokemonCardTitle' showAsSecondaryTitle title={`Height: ${pokemon.height}`} />
                <DocumentCardTitle className='pokemonCardTitle' showAsSecondaryTitle title={`Weight: ${pokemon.weight}`} />
            </DocumentCardDetails>
        </DocumentCard>
    );
    } else {
        return (<div></div>)
    }
    
 

};