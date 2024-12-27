import { Image, StyleSheet, Platform, View, TouchableOpacity, Text, Button, ScrollView } from 'react-native';
import React from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import productsDB from '@/fake_data/products';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function HomeScreen() {

  const [permission, requestPermission] = useCameraPermissions();

  const [products, setProducts] = useState<{id: Number, title: string, imageUrl: string, type: string}[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<{id: Number, title: string, imageUrl: string, type: string} | null>(null)

  useEffect(() => {
    setProducts(productsDB);
  }, [])

  if (!permission) {
    // Camera permissions are still loading.
    return <View style={{backgroundColor: "#ffffff"}}>
      <Text>Loading</Text>
    </View>;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Aceita a permissão, cuzão.</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
        <CameraView style={styles.camera} facing="front">
          <SafeAreaView style={{flex: 1}}>
            {
              !selectedProduct && (
                <>
                  <View style={{
                  backgroundColor: '#88888888',
                  height: 80,
                  padding: 12
                }}><Text style={{
                  color: "#ffffff",
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>Oii seu lindo!</Text>
                  <Text style={{
                  color: "#ffffff",
                  fontSize: 20,
                  textAlign: 'center',
                }}>Compre nossos produtos.</Text>
                </View>
                <View style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                }}>

                  <ScrollView horizontal style={{
                    marginTop: 20
                  }}>
                    {
                      products.map(product => (
                        <TouchableOpacity key={String(product.id)} style={{
                          backgroundColor: '#ffffff',
                          height: 140,
                          width: 130,
                          marginLeft: 20,
                          alignItems: 'center',
                          borderRadius: 4
                        }}
                          onPress={() => setSelectedProduct(product)}
                        >
                        <Image source={{uri: product.imageUrl}} height={80} width={80} style={{resizeMode: 'contain'}} />
                          <Text>{product.title}</Text>
                          </TouchableOpacity>

                      ))
                    }
                  </ScrollView>
                </View>
                </>
              )
            }
            

                {
                  selectedProduct && (
                    <View style={[{
                      position: 'absolute',
                      left: 40,
                      marginTop: 'auto',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }, selectedProduct.type === "touca"? {top: 40, flexDirection: 'column-reverse'}: {bottom: 40,}]}>
                      <Image source={{uri: selectedProduct.imageUrl}} height={300} width={300} style={{
                        resizeMode: 'contain'
                      }} />
                      <TouchableOpacity onPress={() => setSelectedProduct(null)} style={{
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        padding: 8,
                        borderRadius: 4,
                      }}>
                        <MaterialCommunityIcons name="close" size={24} color="red" />
                        <Text style={{color: 'red'}}>Fechar</Text>
                      </TouchableOpacity>
                    </View>
                  )
                }

          </SafeAreaView>
        </CameraView>
    

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
},
);
