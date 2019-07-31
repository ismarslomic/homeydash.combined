class MutationsType {
    mutationName = '';

    constructor(mutationName: string) {
        this.mutationName = mutationName;
    }
}

// Setup
export const SET_SETUP_COMPLETED: MutationsType =
    new MutationsType('setIsSetupCompleted');
