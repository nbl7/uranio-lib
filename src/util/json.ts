/**
 * Util module for JSON
 *
 */
export function safe_json_stringify(obj:unknown):string {
	try{
		return JSON.stringify(obj);
	}catch(ex){
		return `{error: ${ex.getMessage}}`;
	}
}