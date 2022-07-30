import * as React from 'react';
import { Stack, IStackTokens } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import './SearchPage.css'
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { PokemonDetail } from '../PokemonDetail/PokemonDetail';

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens: IStackTokens = { childrenGap: 40 };

export const SearchPage: React.FunctionComponent = () => {
    const [searchValue, setSearchValue] = React.useState('');
    const [pokemonList, setPokemonList] = React.useState<any[]>([]);
    const [selectedPokemon, setSelectedPokemon] = React.useState<any>()

    const catchEmAll = async () => {
        const url = 'https://pokeapi.co/api/v2/pokemon'
        const response: any = await fetch(url)
        return await response.json()
    }

    const pokemonSelected = (selectedPocketMonster: any) => {
        setSelectedPokemon(selectedPocketMonster)
        return 
    }

    const onChangesearchValue = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setSearchValue(newValue || '');
        },
        [],
    );
    function _alertClicked(): void {
        alert(searchValue);
    }

    React.useEffect(() => {
        catchEmAll().then(data => {
            if (!data) {
                setPokemonList([])
            }
            else {
                setPokemonList(data.results)

            }
        })
    }, [])

    if (!selectedPokemon) {
        return (
            <div className='searchBar'>
                <TextField
                    label="Search Pokemon by Name"
                    value={searchValue}
                    onChange={onChangesearchValue}
                    styles={textFieldStyles}
                />
                <PrimaryButton text="Get Pokemon" onClick={_alertClicked} allowDisabledFocus />
                <div>
                    {pokemonList.map(pokemon => <PokemonCard key={pokemon.name} url={pokemon.url} handleClick={pokemonSelected} />)}
                </div>
            </div>
        );
    } else {
        return (<PokemonDetail pokemon={selectedPokemon} />)
    }

};