
const { join } = require('path');
function get_config(message) {
    switch (message.model) {
        case "sherpa-onnx-sense-voice-zh-en-ja-ko-yue-2024-07-17":
            return {
                'featConfig': {
                    'sampleRate': 16000,
                    'featureDim': 80,
                },
                'modelConfig': {
                    'senseVoice': {
                        'model': join(message.modelDir, message.model, 'model.int8.onnx'),
                        'useInverseTextNormalization': 1,
                    },
                    'tokens': join(message.modelDir, message.model, 'tokens.txt'),
                    'numThreads': 2,
                    'provider': 'cpu',
                    'debug': 1,
                }
            };
        case "sherpa-onnx-whisper-tiny":
        case "sherpa-onnx-whisper-base":
        case "sherpa-onnx-whisper-small":
        case "sherpa-onnx-whisper-large-v3":
            let modelConfigMap = {
                "sherpa-onnx-whisper-tiny": "tiny",
                "sherpa-onnx-whisper-base": "base",
                "sherpa-onnx-whisper-small": "small",
                "sherpa-onnx-whisper-large_v3": "large-v3"
            };
            modelSize = modelConfigMap[message.model];
            return {
                'featConfig': {
                    'sampleRate': 16000,
                    'featureDim': 80,
                },
                'modelConfig': {
                    'whisper': {
                        'encoder': join(message.modelDir, message.model,  `${modelSize}-encoder.int8.onnx`),
                        'decoder': join(message.modelDir, message.model, `${modelSize}-decoder.onnx`),
                    },
                    'tokens': join(message.modelDir, message.model, `${modelSize}-tokens.txt`),
                    'numThreads': 2,
                    'provider': 'cpu',
                    'debug': 1,
                }
            };
    }
}
module.exports = get_config;