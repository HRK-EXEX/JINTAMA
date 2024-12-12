// ユーティリティ関数
export class Utility {
    toRadian (degrees) {
        return degrees * Math.PI / 180;
    };

    generateControllablePromise(resolveFunctionName, rejectFunctionName){
        let resolveFunction, rejectFunction;
        const promise = new Promise((res,rej)=>{ resolveFunction = res; rejectFunction = rej; });
        promise[resolveFunctionName] = resolveFunction;
        promise[rejectFunctionName] = rejectFunction;
        return promise;
    }
}